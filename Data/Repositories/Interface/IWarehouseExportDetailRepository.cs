using System;
using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IWarehouseExportDetailRepository : IRepository<WarehouseExportDetail>
    {
        public List<WarehouseExportDetail> GetByOrderIDToList(int orderID);
        public List<WarehouseExportDetail> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd);
    }
}

