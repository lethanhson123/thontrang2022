using System;
namespace ThonTrang.Data.Models
{
    public partial class MembershipSystemApplication : BaseModel
    {
        public int? SystemApplicationID { get; set; }
        public string SystemApplicationName { get; set; }        
    }
}

