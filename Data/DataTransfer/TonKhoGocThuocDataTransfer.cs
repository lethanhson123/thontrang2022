using System;
namespace ThonTrang.Data.Models
{
    public partial class TonKhoGocThuocDataTransfer
    {
        public int ProductIngredientID { get; set; }
        public string ProductIngredientDisplay { get; set; }
        public string UnitDisplay { get; set; }       
        public decimal? QuantityImport { get; set; }
        public decimal? QuantityExport { get; set; }
        public decimal? QuantityInStock { get; set; }       
    }
}

