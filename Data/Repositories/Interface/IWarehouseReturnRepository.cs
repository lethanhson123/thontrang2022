using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IWarehouseReturnRepository : IRepository<WarehouseReturn>
    {
        public int InitializationByID(int ID);
        public List<WarehouseReturn> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString);
    }
}

