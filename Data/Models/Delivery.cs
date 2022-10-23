using System;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Models
{
    public partial class Delivery : BaseModel
    {
        public DateTime? DateFounded { get; set; }
        public DateTime? DateDelivery { get; set; }
        public int? ProvinceID { get; set; }
        public string ProvinceName { get; set; }
        public decimal? Weight { get; set; }
        public int? TruckID { get; set; }
        public string TruckNumberControl { get; set; }
        public string TruckDriver { get; set; }
        public string TruckOwner { get; set; }
        public string TruckPhone { get; set; }
        public int? TruckWeight { get; set; }
        public Delivery()
        {
            Active = true;
            Weight = AppGlobal.InitializationNumber;
            DateFounded = AppGlobal.InitializationDateTime;
            DateDelivery = AppGlobal.InitializationDateTime;            
        }
    }
}

