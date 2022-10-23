using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class CustomerCategoryPriceRepository : Repository<CustomerCategoryPrice>, ICustomerCategoryPriceRepository
    {
        private readonly ThonTrangContext _context;
        public CustomerCategoryPriceRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public List<CustomerCategoryPrice> GetByParentIDAndSearchStringToList(int parentID, string searchString)
        {
            List<CustomerCategoryPrice> list = new List<CustomerCategoryPrice>();
            if (!string.IsNullOrEmpty(searchString))
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerCategoryPriceSelectItemsByParentIDAndSearchString", parameters);
                list = SQLHelper.ToList<CustomerCategoryPrice>(dt);
            }
            else
            {
                SqlParameter[] parameters =
                 {
                    new SqlParameter("@ParentID",parentID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerCategoryPriceSelectItemsByParentID", parameters);
                list = SQLHelper.ToList<CustomerCategoryPrice>(dt);
            }
            return list;
        }
    }
}

