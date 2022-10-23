using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface ICustomerCategoryPriceRepository : IRepository<CustomerCategoryPrice>
    {
        public List<CustomerCategoryPrice> GetByParentIDAndSearchStringToList(int parentID, string searchString);
    }
}

