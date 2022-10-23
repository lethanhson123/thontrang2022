using System;
namespace ThonTrang.Data.Models
{
    public partial class Company : BaseModel
    {
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }        
    }
}

