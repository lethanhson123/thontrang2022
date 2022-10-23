using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IWarehouseCancelRepository : IRepository<WarehouseCancel>
    {
        public int InitializationByID(int ID);
        public List<WarehouseCancel> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString);
    }
}

