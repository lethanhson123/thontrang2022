using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IWarehouseExportRepository : IRepository<WarehouseExport>
    {
        public int InitializationByID(int ID);
        public int CovertOrderToWarehouseExportByOrderIDAndUserUpdated(int orderID, int userUpdated);
        public List<WarehouseExport> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString);
        public WarehouseExport GetByActiveAndCompanyIDAndParentID(bool active, int companyID, int parentID);
        public List<WarehouseExport> GetByActiveAndCustomerIDToList(bool active, int customerID);
        public List<WarehouseExport> GetByActiveAndCustomerIDAndCompanyIDToList(bool active, int customerID, int companyID);
    }
}

