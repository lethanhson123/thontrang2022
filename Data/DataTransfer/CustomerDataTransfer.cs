using System;
namespace ThonTrang.Data.Models
{
    public partial class CustomerDataTransfer: Customer
    {
        public decimal? NoDauKy { get; set; }
        public decimal? PhatSinh { get; set; }
        public decimal? ThanhToan { get; set; }

        public decimal? NoCuoiKy { get; set; }
    }
}

