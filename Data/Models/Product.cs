using System;
namespace ThonTrang.Data.Models
{
    public partial class Product : BaseModel
    {
        public string ImageFileName { get; set; }
        public string ImageURL { get; set; }
        public string Slug { get; set; }
        public string URL { get; set; }
        public string ContentOriginal { get; set; }
        public string ContentHTML { get; set; }
        public int? UnitID { get; set; }        
        public decimal? Weight { get; set; }
        public int? UnitID02 { get; set; }
        public decimal? Weight02 { get; set; }
        public int? SpecificationsNumber { get; set; }
        public string NameOriginal { get; set; }
        public string Specifications { get; set; }
        public string NameSpecial { get; set; }
        public int? CompanyID { get; set; }
        public string ParentName { get; set; }
        public string CompanyName { get; set; }
        public int? QuantityExport { get; set; }
        public int? QuantityExport02 { get; set; }
        public int? QuantityImport { get; set; }
        public int? QuantityImport02 { get; set; }
        public int? QuantityInStock { get; set; }
        public int? QuantityInStock02 { get; set; }
        public int? ProductIngredientID { get; set; }
    }
}

