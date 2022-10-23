using System;
namespace ThonTrang.Data.Models
{
    public partial class Truck : BaseModel
    {
        public string NumberControl { get; set; }
        public string Driver { get; set; }
        public string Owner { get; set; }
        public string Phone { get; set; }
        public int? Weight { get; set; }
    }
}

