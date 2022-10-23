using System;
namespace ThonTrang.Data.Models
{
    public partial class Membership : BaseModel
    {
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string GUICode { get; set; }
        public string ParentName { get; set; }
    }
}

