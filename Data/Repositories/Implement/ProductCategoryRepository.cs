using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class ProductCategoryRepository : Repository<ProductCategory>, IProductCategoryRepository
    {
        private readonly ThonTrangContext _context;
        public ProductCategoryRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

