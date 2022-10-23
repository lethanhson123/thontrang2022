using System;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Models
{
    public partial class WarehouseExport : BaseModel
    {
        public DateTime? DateFounded { get; set; }
        public int? UserFoundedID { get; set; }
        public string UserFoundedDisplay { get; set; }
        public int? CompanyID { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyDisplay { get; set; }
        public string CompanyTaxCode { get; set; }
        public string CompanyPhone { get; set; }
        public int? CustomerID { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerDisplay { get; set; }
        public string CustomerTaxCode { get; set; }
        public string CustomerPhone { get; set; }
        public decimal? Total { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalDiscount { get; set; }
        public decimal? Tax { get; set; }
        public decimal? TotalTax { get; set; }
        public decimal? TotalFinal { get; set; }
        public int? StatusID { get; set; }
        public string StatusName { get; set; }
        public string AddressDelivery { get; set; }
        public decimal? Weight { get; set; }
        public decimal? TotalPay { get; set; }
        public decimal? TotalDebt { get; set; }
        public WarehouseExport()
        {
            Active = true;
            StatusID = 1;
            TotalFinal = 0;
            DateFounded = AppGlobal.InitializationDateTime;
            Code = AppGlobal.InitializationDateTimeTicksCode.Substring(0, 5);
        }
    }
}

