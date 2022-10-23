using System;
namespace ThonTrang.Data.Models
{
    public partial class OrderDetail : BaseModel
    {
        public int? ProductID { get; set; }
        public string ProductDisplay { get; set; }
        public string ProductImageURL { get; set; }
        public string ProductDescription { get; set; }
        public int? UnitID { get; set; }
        public string UnitDisplay { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public decimal? Total { get; set; }
        public int? StatusID { get; set; }
        public string StatusName { get; set; }
        public int? QuantityExport { get; set; }
        public int? QuantityExport02 { get; set; }
        public int? QuantityImport { get; set; }
        public int? QuantityImport02 { get; set; }
        public int? QuantityInStock { get; set; }
        public int? QuantityInStock02 { get; set; }
        public decimal? Weight { get; set; }
    }
}

