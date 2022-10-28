using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class CustomerPriceRepository : Repository<CustomerPrice>, ICustomerPriceRepository
    {
        private readonly ThonTrangContext _context;
        public CustomerPriceRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public int UpdateItemsByCustomerCategoryIDAndProductIDAndPrice(int customerCategoryID, int productID, decimal price)
        {
            int result = AppGlobal.InitializationNumber;
            SqlParameter[] parameters =
            {
                new SqlParameter("@CustomerCategoryID", customerCategoryID),
                new SqlParameter("@ProductID",productID),
                new SqlParameter("@Price",price),
            };
            SQLHelper.ExecuteNonQuery(AppGlobal.SQLServerConectionString, "sp_CustomerPriceUpdateItemsByCustomerCategoryIDAndProductIDAndPrice", parameters);
            return result;
        }
        public override List<CustomerPrice> GetByParentIDToList(int parentID)
        {
            List<CustomerPrice> list = new List<CustomerPrice>();
            SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerPriceSelectItemsByParentID", parameters);
            list = SQLHelper.ToList<CustomerPrice>(dt);
            return list;
        }
        public List<CustomerPrice> GetByParentIDAndIsWishlistToList(int parentID, bool isWishlist)
        {
            List<CustomerPrice> list = new List<CustomerPrice>();
            if (isWishlist == true)
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                    new SqlParameter("@IsWishlist",isWishlist),
                    };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerPriceSelectItemsByParentIDAndIsWishlist", parameters);
                list = SQLHelper.ToList<CustomerPrice>(dt);
            }
            else
            {
                list = GetByParentIDToList(parentID);
            }
            return list;
        }
        public List<CustomerPrice> GetByParentIDAndSearchStringToList(int parentID, string searchString)
        {
            List<CustomerPrice> list = new List<CustomerPrice>();
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerPriceSelectItemsByParentIDAndSearchString", parameters);
                list = SQLHelper.ToList<CustomerPrice>(dt);
            }
            else
            {
                list = GetByParentIDToList(parentID);
            }
            return list;
        }
        public List<CustomerPrice> GetByParentIDAndSearchStringAndIsWishlistToList(int parentID, string searchString, bool isWishlist)
        {
            List<CustomerPrice> list = new List<CustomerPrice>();
            if (!string.IsNullOrEmpty(searchString))
            {
                list = GetByParentIDAndSearchStringToList(parentID, searchString);
            }
            else
            {
                if (isWishlist == true)
                {
                    list = GetByParentIDAndIsWishlistToList(parentID, isWishlist);
                }
                else
                {
                    list = GetByParentIDToList(parentID);
                }
            }


            return list;
        }
    }
}

