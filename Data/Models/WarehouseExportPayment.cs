using System;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Models
{
    public partial class WarehouseExportPayment : BaseModel
    {        
        public decimal? TotalPay { get; set; }
        public DateTime? DatePay { get; set; }
        public WarehouseExportPayment()
        {
            Active = true;            
            TotalPay = 0;
            DatePay = AppGlobal.InitializationDateTime;            
        }
    }
}

