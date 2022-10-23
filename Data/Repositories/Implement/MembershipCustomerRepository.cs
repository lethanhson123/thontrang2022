using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipCustomerRepository : Repository<MembershipCustomer>, IMembershipCustomerRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipCustomerRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public MembershipCustomer GetByParentIDAndCustomerID(int parentID, int customerID)
        {
            var result = _context.Set<MembershipCustomer>().AsNoTracking().FirstOrDefault(model => model.ParentID == parentID && model.CustomerID == customerID);
            return result;
        }
        public override List<MembershipCustomer> GetByParentIDToList(int parentID)
        {
            List<MembershipCustomer> list = new List<MembershipCustomer>();
            SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipCustomerSelectItemsByParentID", parameters);
            list = SQLHelper.ToList<MembershipCustomer>(dt);
            return list;
        }
        public override List<MembershipCustomer> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            List<MembershipCustomer> list = new List<MembershipCustomer>();
            SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                    new SqlParameter("@Active",active),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipCustomerSelectItemsByParentIDAndActive", parameters);
            list = SQLHelper.ToList<MembershipCustomer>(dt);
            return list;
        }
        public List<MembershipCustomer> GetByParentIDAndActiveAndSearchStringToList(int parentID, bool active, string searchString)
        {
            List<MembershipCustomer> list = new List<MembershipCustomer>();
            if (!string.IsNullOrEmpty(searchString))
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                    new SqlParameter("@Active",active),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipCustomerSelectItemsByParentIDAndActiveAndSearchString", parameters);
                list = SQLHelper.ToList<MembershipCustomer>(dt);
            }
            else
            {
                list = GetByParentIDAndActiveToList(parentID, active);
            }

            return list;
        }
    }
}

