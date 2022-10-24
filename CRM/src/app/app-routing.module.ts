import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomerCategoryPriceComponent } from './customer-category-price/customer-category-price.component';
import { CustomerDebtInfoComponent } from './Customer-Debt/customer-debt-info/customer-debt-info.component';
import { CustomerDebtComponent } from './customer-debt/customer-debt.component';
import { CustomerPriceComponent } from './customer-price/customer-price.component';
import { CustomerCategoryComponent } from './Customer/customer-category/customer-category.component';
import { CustomerInfoComponent } from './Customer/customer-info/customer-info.component';
import { CustomerComponent } from './customer/customer.component';
import { DeliveryInfoComponent } from './Delivery/delivery-info/delivery-info.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { LoginComponent } from './login/login.component';
import { MembershipCategoryComponent } from './membership-category/membership-category.component';
import { MembershipCustomerComponent } from './membership-customer/membership-customer.component';
import { MembershipSystemApplicationComponent } from './membership-system-application/membership-system-application.component';
import { MembershipSystemMenuComponent } from './membership-system-menu/membership-system-menu.component';
import { MembershipInfoComponent } from './membership/membership-info/membership-info.component';
import { MembershipComponent } from './membership/membership.component';
import { OrderSellerComponent } from './order-seller/order-seller.component';
import { OrderToWarehouseExportComponent } from './order-to-warehouse-export/order-to-warehouse-export.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';
import { OrderComponent } from './order/order.component';
import { ProductByDateComponent } from './product-by-date/product-by-date.component';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductStatisticalInfoComponent } from './Statistical/product-statistical-info/product-statistical-info.component';
import { ProductStatisticalComponent } from './statistical/product-statistical/product-statistical.component';
import { SystemApplicationComponent } from './system-application/system-application.component';
import { SystemMenuComponent } from './system-menu/system-menu.component';
import { CompanyInfoComponent } from './System/company/company-info/company-info.component';
import { CompanyComponent } from './System/company/company.component';
import { DistrictComponent } from './System/district/district.component';
import { ProvinceComponent } from './System/province/province.component';
import { StatusComponent } from './System/status/status.component';
import { TruckComponent } from './System/truck/truck.component';
import { UnitComponent } from './System/unit/unit.component';
import { WardComponent } from './System/ward/ward.component';
import { UploadComponent } from './upload/upload.component';
import { WarehouseByDateComponent } from './warehouse-by-date/warehouse-by-date.component';
import { WarehouseCancelInfoComponent } from './warehouse-cancel/warehouse-cancel-info/warehouse-cancel-info.component';
import { WarehouseCancelComponent } from './warehouse-cancel/warehouse-cancel.component';
import { WarehouseExportInfoComponent } from './warehouse-export/warehouse-export-info/warehouse-export-info.component';
import { WarehouseExportComponent } from './warehouse-export/warehouse-export.component';
import { WarehouseImportInfoComponent } from './warehouse-import/warehouse-import-info/warehouse-import-info.component';
import { WarehouseImportComponent } from './warehouse-import/warehouse-import.component';
import { WarehouseReturnInfoComponent } from './warehouse-return/warehouse-return-info/warehouse-return-info.component';
import { WarehouseReturnComponent } from './warehouse-return/warehouse-return.component';

const routes: Routes = [  
  {
    path: 'WarehouseByDate', component: WarehouseByDateComponent,
  },
  {
    path: 'ProductByDate', component: ProductByDateComponent,
  },
  {
    path: 'ProductStatistical', component: ProductStatisticalComponent,
  },
  {
    path: 'ProductStatisticalInfo/:ID', component: ProductStatisticalInfoComponent,
  },
  {
    path: 'ShoppingCart', component: ShoppingCartComponent,
  },
  {
    path: 'OrderSeller', component: OrderSellerComponent,
  },
  {
    path: 'Order', component: OrderComponent,
  },
  {
    path: 'OrderInfo/:ID', component: OrderInfoComponent,
  },
  {
    path: 'Delivery', component: DeliveryComponent,
  },
  {
    path: 'DeliveryInfo/:ID', component: DeliveryInfoComponent,
  },
  {
    path: 'OrderToWarehouseExport/:ID', component: OrderToWarehouseExportComponent,
  },
  {
    path: 'WarehouseCancel', component: WarehouseCancelComponent,
  },
  {
    path: 'WarehouseCancelInfo/:ID', component: WarehouseCancelInfoComponent,
  },
  {
    path: 'WarehouseExport', component: WarehouseExportComponent,
  },
  {
    path: 'WarehouseExportInfo/:ID', component: WarehouseExportInfoComponent,
  },
  {
    path: 'WarehouseImport', component: WarehouseImportComponent,
  },
  {
    path: 'WarehouseImportInfo/:ID', component: WarehouseImportInfoComponent,
  },
  {
    path: 'WarehouseReturn', component: WarehouseReturnComponent,
  },
  {
    path: 'WarehouseReturnInfo/:ID', component: WarehouseReturnInfoComponent,
  },
  {
    path: 'Product', component: ProductComponent,
  },
  {
    path: 'ProductInfo/:ID', component: ProductInfoComponent,
  },
  {
    path: 'ProductCategory', component: ProductCategoryComponent,
  },
  {
    path: 'Company', component: CompanyComponent,
  },
  {
    path: 'CompanyInfo/:ID', component: CompanyInfoComponent,
  },
  {
    path: 'Unit', component: UnitComponent,
  },
  {
    path: 'Status', component: StatusComponent,
  },
  {
    path: 'Province', component: ProvinceComponent,
  },
  {
    path: 'District', component: DistrictComponent,
  },
  {
    path: 'Ward', component: WardComponent,
  },
  {
    path: 'Truck', component: TruckComponent,
  },
  {
    path: 'CustomerCategory', component: CustomerCategoryComponent,
  },
  {
    path: 'Customer', component: CustomerComponent,
  },  
  {
    path: 'CustomerInfo/:ID', component: CustomerInfoComponent,
  },
  {
    path: 'CustomerCategoryPrice', component: CustomerCategoryPriceComponent,
  },  
  {
    path: 'CustomerPrice', component: CustomerPriceComponent,
  },  
  {
    path: 'CustomerDebt', component: CustomerDebtComponent,
  },  
  {
    path: 'CustomerDebtInfo/:ID', component: CustomerDebtInfoComponent,
  },
  {
    path: 'Membership', component: MembershipComponent,
  }, 
  {
    path: 'MembershipInfo/:ID', component: MembershipInfoComponent,
  },
  {
    path: 'MembershipCategory', component: MembershipCategoryComponent,
  }, 
  {
    path: 'MembershipCustomer', component: MembershipCustomerComponent,
  }, 
  {
    path: 'MembershipSystemApplication', component: MembershipSystemApplicationComponent,
  }, 
  {
    path: 'MembershipSystemMenu', component: MembershipSystemMenuComponent,
  }, 
  {
    path: 'SystemApplication', component: SystemApplicationComponent,
  }, 
  {
    path: 'SystemMenu', component: SystemMenuComponent,
  }, 
  {
    path: 'Upload', component: UploadComponent,
  },
  {
    path: 'Login', component: LoginComponent,
  },
  {
    path: 'ChangePassword', component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
