using System;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Models
{
    public partial class ProductMedicine : BaseModel
    {
        public string ProductDisplay { get; set; }
        public string ProductImageURL { get; set; }
        public int? ProductIngredientID { get; set; }
        public string ProductIngredientDisplay { get; set; }
        public int? UnitID { get; set; }
        public string UnitDisplay { get; set; }
        public decimal? Specifications { get; set; }
        public ProductMedicine()
        {
            Active = true;
            ProductIngredientID = 1;
            UnitID = 1;
            Specifications = 1;
        }
    }
}

