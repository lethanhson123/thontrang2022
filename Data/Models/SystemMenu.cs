using System;
namespace ThonTrang.Data.Models
{
    public partial class SystemMenu : BaseModel
    {
        public string Icon { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
    }
}

