using System;
namespace ThonTrang.Data.Models
{
    public partial class WarehouseExportDetailSource : BaseModel
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
        public int? SourceID { get; set; }
        public int? SourceParentID { get; set; }
        public int? QuantitySource { get; set; }
        public DateTime? DateFounded { get; set; }
    }
}

