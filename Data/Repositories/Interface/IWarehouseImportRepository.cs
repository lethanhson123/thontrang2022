using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IWarehouseImportRepository : IRepository<WarehouseImport>
    {
        public int InitializationByID(int ID);
        public List<WarehouseImport> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString);
    }
}

