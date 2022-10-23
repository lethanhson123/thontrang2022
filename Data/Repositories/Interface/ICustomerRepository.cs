using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        public List<Customer> GetByParentIDAndProvinceIDToList(int parentID, int provinceID);        
    }
}

