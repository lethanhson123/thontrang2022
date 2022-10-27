using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddDbContext<ThonTrangContext>();
            services.AddTransient<IUnitRepository, UnitRepository>();
            services.AddTransient<IProductMedicineRepository, ProductMedicineRepository>();
            services.AddTransient<IProductIngredientRepository, ProductIngredientRepository>();
            services.AddTransient<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ICompanyRepository, CompanyRepository>();
            services.AddTransient<ICustomerCategoryRepository, CustomerCategoryRepository>();
            services.AddTransient<ICustomerCategoryPriceRepository, CustomerCategoryPriceRepository>();
            services.AddTransient<ICustomerPriceRepository, CustomerPriceRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<ICustomerWishlistRepository, CustomerWishlistRepository>();
            services.AddTransient<IDeliveryDetailRepository, DeliveryDetailRepository>();
            services.AddTransient<IDeliveryRepository, DeliveryRepository>();
            services.AddTransient<IDistrictRepository, DistrictRepository>();
            services.AddTransient<IMembershipRepository, MembershipRepository>();
            services.AddTransient<IMembershipCategoryRepository, MembershipCategoryRepository>();
            services.AddTransient<IMembershipCustomerRepository, MembershipCustomerRepository>();
            services.AddTransient<IMembershipSystemApplicationRepository, MembershipSystemApplicationRepository>();
            services.AddTransient<IMembershipSystemMenuRepository, MembershipSystemMenuRepository>();
            services.AddTransient<IMembershipAccessHistoryRepository, MembershipAccessHistoryRepository>();
            services.AddTransient<IMembershipAuthenticationTokenRepository, MembershipAuthenticationTokenRepository>();
            services.AddTransient<ISystemApplicationRepository, SystemApplicationRepository>();
            services.AddTransient<ISystemMenuRepository, SystemMenuRepository>();
            services.AddTransient<IOrderDetailRepository, OrderDetailRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IProvinceRepository, ProvinceRepository>();
            services.AddTransient<ITruckRepository, TruckRepository>();
            services.AddTransient<IWardRepository, WardRepository>();
            services.AddTransient<IWarehouseCancelDetailRepository, WarehouseCancelDetailRepository>();
            services.AddTransient<IWarehouseCancelRepository, WarehouseCancelRepository>();
            services.AddTransient<IWarehouseExportDetailRepository, WarehouseExportDetailRepository>();
            services.AddTransient<IWarehouseExportDetailSourceRepository, WarehouseExportDetailSourceRepository>();
            services.AddTransient<IWarehouseExportRepository, WarehouseExportRepository>();
            services.AddTransient<IWarehouseExportPaymentRepository, WarehouseExportPaymentRepository>();
            services.AddTransient<IWarehouseImportDetailRepository, WarehouseImportDetailRepository>();
            services.AddTransient<IWarehouseImportRepository, WarehouseImportRepository>();
            services.AddTransient<IWarehouseProductRepository, WarehouseProductRepository>();
            services.AddTransient<IWarehouseReturnDetailRepository, WarehouseReturnDetailRepository>();
            services.AddTransient<IWarehouseReturnRepository, WarehouseReturnRepository>();
            services.AddTransient<IStatusRepository, StatusRepository>();
            services.AddTransient<IReportRepository, ReportRepository>();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
             options.AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
