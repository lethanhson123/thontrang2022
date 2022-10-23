using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface ICustomerPriceRepository : IRepository<CustomerPrice>
    {
        public int UpdateItemsByCustomerCategoryIDAndProductIDAndPrice(int customerCategoryID, int productID, decimal price);
        public List<CustomerPrice> GetByParentIDAndIsWishlistToList(int parentID, bool isWishlist);
        public List<CustomerPrice> GetByParentIDAndSearchStringToList(int parentID, string searchString);
        public List<CustomerPrice> GetByParentIDAndSearchStringAndIsWishlistToList(int parentID, string searchString, bool isWishlist);
    }
}

