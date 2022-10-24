using System;
using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IReportRepository
    {
        public CustomerDataTransfer ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd(int customerID, DateTime dateBegin, DateTime dateEnd);
        public List<WarehouseExportDetail> ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd001ToList(int customerID, DateTime dateBegin, DateTime dateEnd);
        public List<WarehouseExportDetail> ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd002ToList(int customerID, DateTime dateBegin, DateTime dateEnd);
        public List<ProductDataTransfer> TheKhoByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd);
        public List<ProductDataTransfer> TheKhoByProductIDAndDateBeginAndDateEndToList(int productID, DateTime dateBegin, DateTime dateEnd);
        public List<WarehouseDetailDataTransfer> TheKhoByProductIDToList(int productID);
    }
}

