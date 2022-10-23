using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseExportDetailSourceRepository : Repository<WarehouseExportDetailSource>, IWarehouseExportDetailSourceRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseExportDetailSourceRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public int InitializationByID(int ID)
        {
            int result = AppGlobal.InitializationNumber;
            SqlParameter[] parameters =
            {
                new SqlParameter("@ID",ID),
            };
            SQLHelper.ExecuteNonQuery(AppGlobal.SQLServerConectionString, "sp_WarehouseExportDetailSourceInitializationByID", parameters);
            return result;
        }
        public override List<WarehouseExportDetailSource> GetByParentIDToList(int parentID)
        {
            List<WarehouseExportDetailSource> list = new List<WarehouseExportDetailSource>();
            SqlParameter[] parameters =
            {
                    
                    new SqlParameter("@ParentID",parentID),
            };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportDetailSourceSelectItemsByParentID", parameters);
            list = SQLHelper.ToList<WarehouseExportDetailSource>(dt);
            return list;
        }
    }
}

