using System;
using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        public List<Product> GetByCompanyIDAndSearchStringToList(int companyID, string searchString);
        public List<Product> GetByDateBeginAndDateEndAndSearchStringToList(DateTime dateBegin, DateTime dateEnd, string searchString);
    }
}

