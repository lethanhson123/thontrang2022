using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ThonTrang.Data.Models
{
    public partial class ThonTrangContext : DbContext
    {
        public ThonTrangContext()
        {
        }

        public ThonTrangContext(DbContextOptions<ThonTrangContext> options)
            : base(options)
        {
        }
        public virtual DbSet<ThonTrang.Data.Models.Product> Product { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.ProductCategory> ProductCategory { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Unit> Unit { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Company> Company { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Customer> Customer { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.CustomerCategory> CustomerCategory { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.CustomerCategoryPrice> CustomerCategoryPrice { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.CustomerPrice> CustomerPrice { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.CustomerWishlist> CustomerWishlist { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Delivery> Delivery { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.DeliveryDetail> DeliveryDetail { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.District> District { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Membership> Membership { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.MembershipCategory> MembershipCategory { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.MembershipCustomer> MembershipCustomer { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.MembershipSystemApplication> MembershipSystemApplication { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.MembershipSystemMenu> MembershipSystemMenu { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.MembershipAccessHistory> MembershipAccessHistory { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.MembershipAuthenticationToken> MembershipAuthenticationToken { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.SystemApplication> SystemApplication { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.SystemMenu> SystemMenu { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Order> Order { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Province> Province { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Truck> Truck { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Ward> Ward { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseCancel> WarehouseCancel { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseCancelDetail> WarehouseCancelDetail { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseExport> WarehouseExport { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseExportPayment> WarehouseExportPayment { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseExportDetail> WarehouseExportDetail { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseExportDetailSource> WarehouseExportDetailSource { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseImport> WarehouseImport { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseImportDetail> WarehouseImportDetail { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseProduct> WarehouseProduct { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseReturn> WarehouseReturn { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.WarehouseReturnDetail> WarehouseReturnDetail { get; set; }
        public virtual DbSet<ThonTrang.Data.Models.Status> Status { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ThonTrang.Helpers.AppGlobal.SQLServerConectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
