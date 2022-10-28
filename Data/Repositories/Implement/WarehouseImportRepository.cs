using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseImportRepository : Repository<WarehouseImport>, IWarehouseImportRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseImportRepository(ThonTrangContext context) : base(context)
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
            SQLHelper.ExecuteNonQuery(AppGlobal.SQLServerConectionString, "sp_WarehouseImportInitializationByID", parameters);
            return result;
        }
        public List<WarehouseImport> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString)
        {
            List<WarehouseImport> list = new List<WarehouseImport>();
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseImportSelectItemsByActiveAndSearchString", parameters);
                list = SQLHelper.ToList<WarehouseImport>(dt);
            }
            else
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@CompanyID",companyID),
                    new SqlParameter("@Year",year),
                    new SqlParameter("@Month",month),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseImportSelectItemsByActiveAndCompanyIDAndYearAndMonth", parameters);
                list = SQLHelper.ToList<WarehouseImport>(dt);
            }
            return list;
        }
    }
}

