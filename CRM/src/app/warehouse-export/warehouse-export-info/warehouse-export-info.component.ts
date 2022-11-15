import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseExport } from 'src/app/shared/WarehouseExport.model';
import { WarehouseExportService } from 'src/app/shared/WarehouseExport.service';
import { WarehouseExportDetail } from 'src/app/shared/WarehouseExportDetail.model';
import { WarehouseExportDetailService } from 'src/app/shared/WarehouseExportDetail.service';
import { Status } from 'src/app/shared/Status.model';
import { StatusService } from 'src/app/shared/Status.service';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { CustomerPrice } from 'src/app/shared/CustomerPrice.model';
import { CustomerPriceService } from 'src/app/shared/CustomerPrice.service';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { Unit } from 'src/app/shared/Unit.model';
import { UnitService } from 'src/app/shared/Unit.service';
import { WarehouseExportDetailSourceComponent } from 'src/app/warehouse-export-detail-source/warehouse-export-detail-source.component';
import { WarehouseExportPaymentComponent } from 'src/app/warehouse-export-payment/warehouse-export-payment.component';

@Component({
  selector: 'app-warehouse-export-info',
  templateUrl: './warehouse-export-info.component.html',
  styleUrls: ['./warehouse-export-info.component.css']
})
export class WarehouseExportInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'Save', 'Delete', 'WarehouseExportDetailSource'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  isShowAddDetail: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "WarehouseExportInfo";
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public warehouseExportService: WarehouseExportService,
    public warehouseExportDetailService: WarehouseExportDetailService,
    public statusService: StatusService,
    public companyService: CompanyService,
    public customerService: CustomerService,
    public membershipService: MembershipService,
    public productService: ProductService,
    public unitService: UnitService,
    public customerPriceService: CustomerPriceService,
    private dialog: MatDialog
  ) {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getCompanyToList();
        this.getCustomerToList();
        this.getMembershipToList();
        this.getStatusToList();
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getProductToList(queryString: string) {
    this.productService.getByCompanyIDAndSearchStringToList(this.warehouseExportService.formData.CompanyID, queryString).then(res => {
      this.productService.list = res as Product[];
      if (this.productService.list) {
        if (this.productService.list.length) {
          this.warehouseExportDetailService.formData.ProductID = this.productService.list[0].ID;
          this.warehouseExportDetailService.formData.Quantity = 1;
          this.warehouseExportDetailService.formData.Price = 0;
        }
      }
    });
  }
  getCustomerPriceToList(queryString: string) {
    this.customerPriceService.getByParentIDAndSearchStringAndIsWishlistToList(this.warehouseExportService.formData.CustomerID, queryString, true).then(res => {
      this.customerPriceService.list = res as CustomerPrice[];
      if (this.customerPriceService.list) {
        if (this.customerPriceService.list.length) {
          this.warehouseExportDetailService.formData.ProductID = this.customerPriceService.list[0].ProductID;
          this.warehouseExportDetailService.formData.Quantity = 1;
          this.warehouseExportDetailService.formData.Price = this.customerPriceService.list[0].Price;
        }
      }
    });
  }
  getCompanyToList() {
    this.companyService.getAllToList().then(res => {
      this.companyService.list = res as Company[];
    });
  }
  getCustomerToList() {
    this.customerService.getAllToList().then(res => {
      this.customerService.list = res as Customer[];
    });
  }
  getCustomerByID() {
    this.customerService.getByID(this.warehouseExportService.formData.CustomerID).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        this.warehouseExportService.formData.CustomerPhone = this.customerService.formData.Phone;
        this.warehouseExportService.formData.AddressDelivery = this.customerService.formData.Address;
      }
    });
  }
  getCompanyByID() {
    this.companyService.getByID(this.warehouseExportService.formData.CompanyID).then(res => {
      this.companyService.formData = res as Company;
      if (this.companyService.formData) {
        this.warehouseExportService.formData.CompanyPhone = this.companyService.formData.Phone;
        this.warehouseExportService.formData.AddressDelivery = this.companyService.formData.Address;
      }
    });
  }
  getMembershipToList() {
    this.membershipService.getAllToList().then(res => {
      this.membershipService.list = res as Membership[];
    });
  }
  getStatusToList() {
    this.statusService.getAllToList().then(res => {
      this.statusService.list = res as Status[];
    });
  }
  onChangeCustomer($event) {
    this.getCustomerByID();
  }
  onChangeCompany($event) {
    this.getProductToList('');
  }
  onChangeProduct($event) {
    for (let i = 0; i < this.customerPriceService.list.length; i++) {
      if (this.customerPriceService.list[i].ProductID === this.warehouseExportDetailService.formData.ProductID) {
        this.warehouseExportDetailService.formData.Price = this.customerPriceService.list[i].Price;
      }
    }
  }
  onFilterProduct(searchString: string) {
    this.getCustomerPriceToList(searchString);
  }
  getWarehouseExportByQueryString() {
    this.isShowLoading = true;
    this.warehouseExportService.getByIDString(this.queryString).then(res => {
      this.warehouseExportService.formData = res as WarehouseExport;
      this.isShowLoading = false;
    });
  }
  getByQueryString() {
    this.isShowLoading = true;
    this.warehouseExportService.getByIDString(this.queryString).then(res => {
      this.warehouseExportService.formData = res as WarehouseExport;
      if (this.warehouseExportService.formData) {
        if (this.warehouseExportService.formData.ID) {
          this.isShowAddDetail = true;
          this.getByParentIDToList();
        }
        if (this.warehouseExportService.formData.CustomerID) {
          this.getCustomerByID();
        }
        if ((this.warehouseExportService.formData.CustomerID == null) || (this.warehouseExportService.formData.CustomerID == 0)) {
          if (this.customerService.list) {
            if (this.customerService.list.length) {
              this.warehouseExportService.formData.CustomerID = this.customerService.list[0].ID;
              this.getCustomerByID();
            }
          }
        }
        if ((this.warehouseExportService.formData.CompanyID == null) || (this.warehouseExportService.formData.CompanyID == 0)) {
          if (this.companyService.list) {
            if (this.companyService.list.length) {
              this.warehouseExportService.formData.CompanyID = this.companyService.list[0].ID;
            }
          }
        }
        this.getCustomerPriceToList('');
        if ((this.warehouseExportService.formData.StatusID == null) || (this.warehouseExportService.formData.StatusID == 0)) {
          if (this.statusService.list) {
            if (this.statusService.list.length) {
              this.warehouseExportService.formData.StatusID = this.statusService.list[0].ID;
            }
          }
        }
        if ((this.warehouseExportService.formData.UserFoundedID == null) || (this.warehouseExportService.formData.UserFoundedID == 0)) {
          this.warehouseExportService.formData.UserFoundedID = this.notificationService.membershipID;
        }
      }
      this.isShowLoading = false;
    });
  }
  getByID() {
    this.warehouseExportService.getByID(this.warehouseExportService.formData.ID).then(res => {
      this.warehouseExportService.formData = res as WarehouseExport;
    });
  }
  getByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseExportDetailService.getByParentIDToList(this.warehouseExportService.formData.ID).then(res => {
      this.warehouseExportDetailService.list = res as WarehouseExportDetail[];
      this.dataSource = new MatTableDataSource(this.warehouseExportDetailService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.warehouseExportService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.warehouseExportService.formData = res as WarehouseExport;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.warehouseExportService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
  onSaveDetail(element: WarehouseExportDetail) {
    if (this.warehouseExportDetailService.formData) {
      if (this.warehouseExportDetailService.formData.ID) {
        element.ParentID = this.warehouseExportDetailService.formData.ID
        this.isShowLoading = true;
        this.warehouseExportDetailService.save(element).subscribe(
          res => {
            this.notificationService.success(environment.SaveSuccess);
            this.isShowLoading = false;
            this.getWarehouseExportByQueryString();
            this.getByParentIDToList();
            this.getByID();
          },
          err => {
            this.notificationService.warn(environment.SaveNotSuccess);
            this.isShowLoading = false;
          }
        );
      }
      else {
        this.notificationService.warn("Thông tin phiếu chưa lưu thay đổi.");
      }
    }
    else {
      this.notificationService.warn("Thông tin phiếu chưa lưu thay đổi.");
    }
  }
  onAddDetail() {
    this.onSaveDetail(this.warehouseExportDetailService.formData);
  }
  onUpdateDetail(element: WarehouseExportDetail) {
    this.onSaveDetail(element);
  }
  onDeleteDetail(element: WarehouseExportDetail) {
    if (confirm(environment.DeleteConfirm)) {
      this.warehouseExportDetailService.remove(element.ID).then(res => {
        this.notificationService.success(environment.DeleteSuccess);
        this.getWarehouseExportByQueryString();
        this.getByParentIDToList();
        this.getByID();
      });
    }
  }
  onWarehouseExportDetailSource(element: WarehouseExportDetail) {
    this.warehouseExportDetailService.formDataWarehouseExportDetailSource = element;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    dialogConfig.data = { ID: element.ID };
    const dialog = this.dialog.open(WarehouseExportDetailSourceComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
    });
  }
  onWarehouseExportPayment() {
    this.warehouseExportService.ID = this.warehouseExportService.formData.ID;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    dialogConfig.data = { ID: this.warehouseExportService.ID };
    const dialog = this.dialog.open(WarehouseExportPaymentComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getWarehouseExportByQueryString();
    });
  }
}
