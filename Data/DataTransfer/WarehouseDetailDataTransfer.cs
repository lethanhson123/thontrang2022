using System;
namespace ThonTrang.Data.Models
{
    public partial class WarehouseDetailDataTransfer
    {
        public int? SortOrder { get; set; }
        public DateTime? DateFounded { get; set; }
        public string Code { get; set; }
        public string CompanyDisplay { get; set; }
        public string CustomerDisplay { get; set; }
        public int? QuantityImport { get; set; }
        public int? QuantityImport02 { get; set; }
        public int? QuantityExport { get; set; }
        public int? QuantityExport02 { get; set; }
        public int? Quantity { get; set; }
    }
}

