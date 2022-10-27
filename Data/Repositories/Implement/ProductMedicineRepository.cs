using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class ProductMedicineRepository : Repository<ProductMedicine>, IProductMedicineRepository
    {
        private readonly ThonTrangContext _context;
        public ProductMedicineRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override List<ProductMedicine> GetByParentIDToList(int parentID)
        {
            List<ProductMedicine> list = new List<ProductMedicine>();
            SqlParameter[] parameters =
                {
                    new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductMedicineSelectItemsByParentID", parameters);
            list = SQLHelper.ToList<ProductMedicine>(dt);
            return list;
        }
    }
}

