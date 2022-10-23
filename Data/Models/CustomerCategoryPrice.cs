using System;
namespace ThonTrang.Data.Models
{
    public partial class CustomerCategoryPrice : BaseModel
    {
        public decimal? Price { get; set; }
        public int? ProductID { get; set; }
        public string ProductDisplay { get; set; }
        public string ProductImageURL { get; set; }
        public string ProductDescription { get; set; }
    }
}

