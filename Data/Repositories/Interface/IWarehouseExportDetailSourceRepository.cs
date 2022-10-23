using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IWarehouseExportDetailSourceRepository : IRepository<WarehouseExportDetailSource>
    {
        public int InitializationByID(int ID);
    }
}

