using System;
namespace ThonTrang.Data.Models
{
    public partial class MembershipAuthenticationToken : BaseModel
    {
        public string AuthenticationToken { get; set; }
        public DateTime? DateBegin { get; set; }
        public DateTime? DateEnd { get; set; }
        public int? MembershipSystemApplicationID { get; set; }
        public string MembershipSystemApplicationName { get; set; }

    }
}

