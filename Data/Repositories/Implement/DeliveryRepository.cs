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
    public class DeliveryRepository : Repository<Delivery>, IDeliveryRepository
    {
        private readonly ThonTrangContext _context;
        public DeliveryRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public List<Delivery> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd)
        {
            List<Delivery> list = new List<Delivery>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
            };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_DeliverySelectItemsByDateBeginAndDateEnd", parameters);
            list = SQLHelper.ToList<Delivery>(dt);
            return list;
        }
        public Delivery GetByOrderID(int orderID)
        {
            Delivery result = new Delivery();
            List<Delivery> list = new List<Delivery>();
            SqlParameter[] parameters =
            {
                    new SqlParameter("@OrderID",orderID),
            };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_DeliverySelectSingleItemByOrderID", parameters);
            list = SQLHelper.ToList<Delivery>(dt);
            if (list.Count > 0)
            {
                result = list[0];
            }
            return result;
        }
    }
}

