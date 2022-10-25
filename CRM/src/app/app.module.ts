import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { NotificationService } from './shared/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { ChartsModule } from 'ng2-charts';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { UnitComponent } from './System/unit/unit.component';
import { CompanyComponent } from './System/company/company.component';
import { ProductComponent } from './product/product.component';
import { UnitDetailComponent } from './System/unit/unit-detail/unit-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { CompanyInfoComponent } from './System/company/company-info/company-info.component';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { ProductCategoryDetailComponent } from './product/product-category/product-category-detail/product-category-detail.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { ProvinceComponent } from './System/province/province.component';
import { ProvinceDetailComponent } from './System/Province/province-detail/province-detail.component';
import { DistrictComponent } from './System/district/district.component';
import { DistrictDetailComponent } from './System/District/district-detail/district-detail.component';
import { WardComponent } from './System/ward/ward.component';
import { WardDetailComponent } from './System/Ward/ward-detail/ward-detail.component';
import { TruckComponent } from './System/truck/truck.component';
import { TruckDetailComponent } from './System/Truck/truck-detail/truck-detail.component';
import { CustomerCategoryComponent } from './Customer/customer-category/customer-category.component';
import { CustomerCategoryDetailComponent } from './Customer/customer-category/customer-category-detail/customer-category-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { UploadComponent } from './upload/upload.component';
import { MembershipComponent } from './membership/membership.component';
import { CustomerInfoComponent } from './Customer/customer-info/customer-info.component';
import { MembershipInfoComponent } from './membership/membership-info/membership-info.component';
import { OrderComponent } from './order/order.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';
import { StatusComponent } from './System/status/status.component';
import { StatusDetailComponent } from './System/Status/status-detail/status-detail.component';
import { MembershipCustomerComponent } from './membership-customer/membership-customer.component';
import { CustomerCategoryPriceComponent } from './customer-category-price/customer-category-price.component';
import { CustomerPriceComponent } from './customer-price/customer-price.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSellerComponent } from './order-seller/order-seller.component';
import { WarehouseImportComponent } from './warehouse-import/warehouse-import.component';
import { WarehouseExportComponent } from './warehouse-export/warehouse-export.component';
import { WarehouseReturnComponent } from './warehouse-return/warehouse-return.component';
import { WarehouseCancelComponent } from './warehouse-cancel/warehouse-cancel.component';
import { WarehouseImportInfoComponent } from './warehouse-import/warehouse-import-info/warehouse-import-info.component';
import { WarehouseExportInfoComponent } from './warehouse-export/warehouse-export-info/warehouse-export-info.component';
import { WarehouseReturnInfoComponent } from './warehouse-return/warehouse-return-info/warehouse-return-info.component';
import { WarehouseCancelInfoComponent } from './warehouse-cancel/warehouse-cancel-info/warehouse-cancel-info.component';
import { MembershipCategoryComponent } from './membership-category/membership-category.component';
import { MembershipCategoryDetailComponent } from './membership-category/membership-category-detail/membership-category-detail.component';
import { OrderToWarehouseExportComponent } from './order-to-warehouse-export/order-to-warehouse-export.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ProductStatisticalComponent } from './statistical/product-statistical/product-statistical.component';
import { WarehouseExportDetailSourceComponent } from './warehouse-export-detail-source/warehouse-export-detail-source.component';
import { SystemApplicationComponent } from './system-application/system-application.component';
import { SystemMenuComponent } from './system-menu/system-menu.component';
import { MembershipSystemApplicationComponent } from './membership-system-application/membership-system-application.component';
import { MembershipSystemMenuComponent } from './membership-system-menu/membership-system-menu.component';
import { SystemMenuDetailComponent } from './system-menu/system-menu-detail/system-menu-detail.component';
import { SystemApplicationDetailComponent } from './system-application/system-application-detail/system-application-detail.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryInfoComponent } from './Delivery/delivery-info/delivery-info.component';
import { WarehouseExportPaymentComponent } from './warehouse-export-payment/warehouse-export-payment.component';
import { CustomerDebtComponent } from './customer-debt/customer-debt.component';
import { CustomerDebtInfoComponent } from './Customer-Debt/customer-debt-info/customer-debt-info.component';
import { WarehouseByDateComponent } from './warehouse-by-date/warehouse-by-date.component';
import { ProductByDateComponent } from './product-by-date/product-by-date.component';
import { ProductStatisticalInfoComponent } from './Statistical/product-statistical-info/product-statistical-info.component';
import { ProductIngredientComponent } from './product-ingredient/product-ingredient.component';
import { ProductIngredientDetailComponent } from './Product-Ingredient/product-ingredient-detail/product-ingredient-detail.component';
import { ProductIngredientStatisticalComponent } from './statistical/product-ingredient-statistical/product-ingredient-statistical.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    CompanyComponent,    
    ProductComponent,
    ProductCategoryComponent,
    UnitDetailComponent,
    LoadingComponent,
    CompanyInfoComponent,
    ProductCategoryDetailComponent,
    ProductInfoComponent,
    ProvinceComponent,
    ProvinceDetailComponent,
    DistrictComponent,
    DistrictDetailComponent,
    WardComponent,
    WardDetailComponent,
    TruckComponent,
    TruckDetailComponent,
    CustomerCategoryComponent,
    CustomerCategoryDetailComponent,
    CustomerComponent,
    UploadComponent,
    MembershipComponent,
    CustomerInfoComponent,
    MembershipInfoComponent,
    OrderComponent,
    OrderInfoComponent,
    StatusComponent,
    StatusDetailComponent,
    MembershipCustomerComponent,
    CustomerCategoryPriceComponent,
    CustomerPriceComponent,
    ShoppingCartComponent,
    OrderSellerComponent,
    WarehouseImportComponent,
    WarehouseExportComponent,
    WarehouseReturnComponent,
    WarehouseCancelComponent,
    WarehouseImportInfoComponent,
    WarehouseExportInfoComponent,
    WarehouseReturnInfoComponent,
    WarehouseCancelInfoComponent,
    MembershipCategoryComponent,
    MembershipCategoryDetailComponent,
    OrderToWarehouseExportComponent,
    StatisticalComponent,
    ProductStatisticalComponent,
    WarehouseExportDetailSourceComponent,
    SystemApplicationComponent,
    SystemMenuComponent,
    MembershipSystemApplicationComponent,
    MembershipSystemMenuComponent,
    SystemMenuDetailComponent,
    SystemApplicationDetailComponent,
    LoginComponent,
    ChangePasswordComponent,
    DeliveryComponent,
    DeliveryInfoComponent,
    WarehouseExportPaymentComponent,
    CustomerDebtComponent,
    CustomerDebtInfoComponent,
    WarehouseByDateComponent,
    ProductByDateComponent,
    ProductStatisticalInfoComponent,
    ProductIngredientComponent,
    ProductIngredientDetailComponent,
    ProductIngredientStatisticalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    CKEditorModule,
  ],
  providers: [   
    CookieService,  
    NotificationService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
