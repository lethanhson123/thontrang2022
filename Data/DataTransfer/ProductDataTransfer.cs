using System;
namespace ThonTrang.Data.Models
{
    public partial class ProductDataTransfer
    {
        public int ProductID  { get; set; }
        public string ProductImageURL { get; set; }
        public string ProductDisplay { get; set; }
        public string CustomerDisplay { get; set; }
        public int? TonDauKy { get; set; }
        public int? QuantityImport { get; set; }
        public int? QuantityExport { get; set; }
        public int? TonCuoiKy { get; set; }        
    }
}

