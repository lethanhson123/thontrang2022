import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseImport } from 'src/app/shared/WarehouseImport.model';
import { WarehouseImportService } from 'src/app/shared/WarehouseImport.service';
import { WarehouseImportDetail } from 'src/app/shared/WarehouseImportDetail.model';
import { WarehouseImportDetailService } from 'src/app/shared/WarehouseImportDetail.service';
import { Status } from 'src/app/shared/Status.model';
import { StatusService } from 'src/app/shared/Status.service';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { Unit } from 'src/app/shared/Unit.model';
import { UnitService } from 'src/app/shared/Unit.service';

@Component({
  selector: 'app-warehouse-import-info',
  templateUrl: './warehouse-import-info.component.html',
  styleUrls: ['./warehouse-import-info.component.css']
})
export class WarehouseImportInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'Save', 'Delete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "WarehouseImportInfo"; 
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public warehouseImportService: WarehouseImportService,
    public warehouseImportDetailService: WarehouseImportDetailService,
    public statusService: StatusService,
    public companyService: CompanyService,
    public customerService: CustomerService,
    public membershipService: MembershipService,
    public productService: ProductService,
    public unitService: UnitService,
  ) {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;                
        this.getCompanyToList();
        //this.getCustomerToList();
        this.getMembershipToList();
        this.getStatusToList();
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getProductToList(queryString: string) {
    this.productService.getByCompanyIDAndSearchStringToList(this.warehouseImportService.formData.CompanyID, queryString).then(res => {
      this.productService.list = res as Product[];
      if (this.productService.list) {
        if (this.productService.list.length) {
          this.warehouseImportDetailService.formData.ProductID = this.productService.list[0].ID;
          this.warehouseImportDetailService.formData.Quantity = 1;
          this.warehouseImportDetailService.formData.Price = 0;
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
      if ((this.warehouseImportService.formData.CustomerID == null) || (this.warehouseImportService.formData.CustomerID == 0)) {
        if (this.customerService.list) {
          if (this.customerService.list.length) {
            this.warehouseImportService.formData.CustomerID = this.customerService.list[0].ID;
            this.getCustomerByID();
          }
        }
      }
    });
  }
  getCustomerByID() {
    this.customerService.getByID(this.warehouseImportService.formData.CustomerID).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        this.warehouseImportService.formData.CustomerPhone = this.customerService.formData.Phone;
        this.warehouseImportService.formData.AddressDelivery = this.customerService.formData.Address;
      }
    });
  }
  getCompanyByID() {
    this.companyService.getByID(this.warehouseImportService.formData.CompanyID).then(res => {
      this.companyService.formData = res as Company;
      if (this.companyService.formData) {
        this.warehouseImportService.formData.CompanyPhone = this.companyService.formData.Phone;
        this.warehouseImportService.formData.AddressDelivery = this.companyService.formData.Address;
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
  onFilterProduct(searchString: string) {
    this.getProductToList(searchString);
  }

  getByQueryString() {
    this.isShowLoading = true;
    this.warehouseImportService.getByIDString(this.queryString).then(res => {
      this.warehouseImportService.formData = res as WarehouseImport;
      if (this.warehouseImportService.formData) {
        if (this.warehouseImportService.formData.ID) {
          this.getByParentIDToList();
        }               
        if ((this.warehouseImportService.formData.CompanyID == null) || (this.warehouseImportService.formData.CompanyID == 0)) {
          if (this.companyService.list) {
            if (this.companyService.list.length) {
              this.warehouseImportService.formData.CompanyID = this.companyService.list[0].ID;
            }
          }
        }        
        this.getProductToList('');
        if ((this.warehouseImportService.formData.StatusID == null) || (this.warehouseImportService.formData.StatusID == 0)) {
          if (this.statusService.list) {
            if (this.statusService.list.length) {
              this.warehouseImportService.formData.StatusID = this.statusService.list[0].ID;
            }
          }
        }
        if ((this.warehouseImportService.formData.UserFoundedID == null) || (this.warehouseImportService.formData.UserFoundedID == 0)) {
          this.warehouseImportService.formData.UserFoundedID = this.notificationService.membershipID;
        }  
      }
      this.isShowLoading = false;
    });
  }
  getByID() {
    this.warehouseImportService.getByID(this.warehouseImportService.formData.ID).then(res => {
      this.warehouseImportService.formData = res as WarehouseImport;
    });
  }
  getByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseImportDetailService.getByParentIDToList(this.warehouseImportService.formData.ID).then(res => {
      this.warehouseImportDetailService.list = res as WarehouseImportDetail[];
      this.dataSource = new MatTableDataSource(this.warehouseImportDetailService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  } 
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.warehouseImportService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.warehouseImportService.formData = res as WarehouseImport;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.warehouseImportService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }  
  onSaveDetail(element: WarehouseImportDetail) {
    if (this.warehouseImportService.formData) {
      if (this.warehouseImportService.formData.ID) {
        element.ParentID = this.warehouseImportService.formData.ID
        this.isShowLoading = true;
        this.warehouseImportDetailService.save(element).subscribe(
          res => {
            this.notificationService.success(environment.SaveSuccess);
            this.isShowLoading = false;
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
    this.onSaveDetail(this.warehouseImportDetailService.formData);
  }
  onUpdateDetail(element: WarehouseImportDetail) {
    this.onSaveDetail(element);
  }
  onDeleteDetail(element: WarehouseImportDetail) {
    if (confirm(environment.DeleteConfirm)) {
      this.warehouseImportDetailService.remove(element.ID).then(res => {
        this.getByParentIDToList();
        this.getByID();
        this.notificationService.success(environment.DeleteSuccess);
      });
    }
  }
}
