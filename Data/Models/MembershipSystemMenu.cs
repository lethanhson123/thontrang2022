using System;
namespace ThonTrang.Data.Models
{
    public partial class MembershipSystemMenu : BaseModel
    {
        public int? SystemMenuID { get; set; }
        public string SystemMenuName { get; set; }
        public string Icon { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public int? SystemMenuParentID { get; set; }
    }
}

