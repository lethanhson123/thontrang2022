using System;
namespace ThonTrang.Data.Models
{
    public partial class ProductIngredient : BaseModel
    {
        public int? UnitID { get; set; }
        public string UnitDisplay { get; set; }
    }
}

