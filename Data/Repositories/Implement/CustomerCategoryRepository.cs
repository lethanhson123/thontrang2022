using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class CustomerCategoryRepository : Repository<CustomerCategory>, ICustomerCategoryRepository
    {
        private readonly ThonTrangContext _context;
        public CustomerCategoryRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

