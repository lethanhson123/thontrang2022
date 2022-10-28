using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private readonly ThonTrangContext _context;
        public OrderRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
        public List<Order> GetByActiveAndStatusIDAndYearAndMonthAndSearchStringToList(bool active, int statusID, int year, int month, string searchString)
        {
            List<Order> list = new List<Order>();
            if (!string.IsNullOrEmpty(searchString))
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),                    
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_OrderSelectItemsByActiveAndSearchString", parameters);
                list = SQLHelper.ToList<Order>(dt);
            }
            else
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@StatusID",statusID),
                    new SqlParameter("@Year",year),
                    new SqlParameter("@Month",month),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_OrderSelectItemsByActiveAndStatusIDAndYearAndMonth", parameters);
                list = SQLHelper.ToList<Order>(dt);
            }
            return list;
        }
        public List<Order> GetByActiveAndStatusIDAndUserFoundedIDAndSearchStringToList(bool active, int statusID, int userFoundedID, string searchString)
        {
            List<Order> list = new List<Order>();
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@StatusID",statusID),
                    new SqlParameter("@UserFoundedID",userFoundedID),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_OrderSelectItemsByActiveAndStatusIDAndUserFoundedIDAndSearchString", parameters);
                list = SQLHelper.ToList<Order>(dt);
            }
            else
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@StatusID",statusID),
                    new SqlParameter("@UserFoundedID",userFoundedID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_OrderSelectItemsByActiveAndStatusIDAndUserFoundedID", parameters);
                list = SQLHelper.ToList<Order>(dt);
            }
            return list;
        }
    }
}

