using System;
namespace ThonTrang.Data.Models
{
    public partial class Customer : BaseModel
    {
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string ParentName { get; set; }
        public DateTime? DateJoin { get; set; }
        public int? ProvinceID { get; set; }
        public int? DistrictID { get; set; }
        public int? WardID { get; set; }
        public string ProvinceName { get; set; }
        public string GUICode { get; set; }
        public decimal? DebtThonTrang { get; set; }
        public decimal? DebtBiben { get; set; }
        public decimal? DebtVyTam { get; set; }
    }
}

