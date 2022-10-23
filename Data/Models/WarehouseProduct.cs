using System;
namespace ThonTrang.Data.Models
{
    public partial class WarehouseProduct : BaseModel
    {
        public int? DateFounded { get; set; }
        public int? WarehouseYear { get; set; }
        public int? WarehouseMonth { get; set; }
        public int? WarehouseDay { get; set; }
        public int? ProductID { get; set; }
        public int? ProductDisplay { get; set; }
        public int? ProductImageURL { get; set; }
        public int? ProductDescription { get; set; }
        public int? UnitID { get; set; }
        public int? UnitDisplay { get; set; }
        public int? QuantityImport { get; set; }
        public int? QuantityImport02 { get; set; }
        public int? QuantityExport { get; set; }
        public int? QuantityExport02 { get; set; }
        public int? QuantityInStock { get; set; }
        public int? QuantityInStock02 { get; set; }
        public int? QuantityImportTotal { get; set; }
        public int? QuantityImport02Total { get; set; }
        public int? QuantityExportTotal { get; set; }
        public int? QuantityExport02Total { get; set; }
        public int? QuantityInStockTotal { get; set; }
        public int? QuantityInStock02Total { get; set; }       

    }
}

