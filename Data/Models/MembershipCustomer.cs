using System;
namespace ThonTrang.Data.Models
{
    public partial class MembershipCustomer : BaseModel
    {
        public int? ProvinceID { get; set; }
        public string ProvinceName { get; set; }
        public int? CustomerID { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string CustomerDisplay { get; set; }
        public string CustomerTaxCode { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerCategoryName { get; set; }        

    }
}

