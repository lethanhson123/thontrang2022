using System;
namespace ThonTrang.Data.Models
{
    public partial class DeliveryDetail : BaseModel
    {
        public int? OrderID { get; set; }
        public string OrderCode { get; set; }
        public decimal? Weight { get; set; }
        public string AddressDelivery { get; set; }
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
        public DateTime? DateFounded { get; set; }
    }
}

