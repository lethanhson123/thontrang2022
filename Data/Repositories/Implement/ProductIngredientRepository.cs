using System.Collections.Generic;
using System.Data;
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
        public override List<ProductIngredient> GetAllToList()
        {
            List<ProductIngredient> list = new List<ProductIngredient>();
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductIngredientSelectAllItems");
            list = SQLHelper.ToList<ProductIngredient>(dt);
            return list;
        }
    }
}

