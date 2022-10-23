using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseExportRepository : Repository<WarehouseExport>, IWarehouseExportRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseExportRepository(ThonTrangContext context) : base(context)
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
        public int CovertOrderToWarehouseExportByOrderIDAndUserUpdated(int orderID, int userUpdated)
        {
            int result = AppGlobal.InitializationNumber;
            SqlParameter[] parameters =
            {
                new SqlParameter("@OrderID",orderID),
                new SqlParameter("@UserUpdated",userUpdated),
            };
            SQLHelper.ExecuteNonQuery(AppGlobal.SQLServerConectionString, "sp_WarehouseExportCovertOrderToWarehouseExportByOrderIDAndUserUpdated", parameters);
            return result;
        }
        public List<WarehouseExport> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString)
        {
            List<WarehouseExport> list = new List<WarehouseExport>();
            if (!string.IsNullOrEmpty(searchString))
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportSelectItemsByActiveAndSearchString", parameters);
                list = SQLHelper.ToList<WarehouseExport>(dt);
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
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportSelectItemsByActiveAndCompanyIDAndYearAndMonth", parameters);
                list = SQLHelper.ToList<WarehouseExport>(dt);
            }
            return list;
        }
        public WarehouseExport GetByActiveAndCompanyIDAndParentID(bool active, int companyID, int parentID)
        {
            WarehouseExport result = new WarehouseExport();
            SqlParameter[] parameters =
            {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@CompanyID",companyID),
                    new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportSelectItemsByActiveAndCompanyIDAndParentID", parameters);
            List<WarehouseExport> list = SQLHelper.ToList<WarehouseExport>(dt);
            if (list.Count > 0)
            {
                result = list[0];
            }
            return result;
        }
        public List<WarehouseExport> GetByActiveAndCustomerIDToList(bool active, int customerID)
        {            
            SqlParameter[] parameters =
            {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@CustomerID",customerID),                    
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportSelectItemsByActiveAndCustomerID", parameters);
            List<WarehouseExport> list = SQLHelper.ToList<WarehouseExport>(dt);            
            return list;
        }
        public List<WarehouseExport> GetByActiveAndCustomerIDAndCompanyIDToList(bool active, int customerID, int companyID)
        {
            SqlParameter[] parameters =
            {
                    new SqlParameter("@Active",active),
                    new SqlParameter("@CustomerID",customerID),
                    new SqlParameter("@CompanyID",companyID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportSelectItemsByActiveAndCustomerIDAndCompanyID", parameters);
            List<WarehouseExport> list = SQLHelper.ToList<WarehouseExport>(dt);
            return list;
        }
    }
}

