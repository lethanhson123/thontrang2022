using System;
namespace ThonTrang.Data.Models
{
    public partial class MembershipAccessHistory : BaseModel
    {
        public int? UserIDAccess { get; set; }
        public string UserNameAccess { get; set; }
        public DateTime? DateAccess { get; set; }
        public string URL { get; set; }
    }
}

