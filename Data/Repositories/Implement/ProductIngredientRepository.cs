using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class ProductIngredientRepository : Repository<ProductIngredient>, IProductIngredientRepository
    {
        private readonly ThonTrangContext _context;
        public ProductIngredientRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

