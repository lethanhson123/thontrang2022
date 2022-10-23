import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseReturn } from 'src/app/shared/WarehouseReturn.model';
import { WarehouseReturnService } from 'src/app/shared/WarehouseReturn.service';
import { WarehouseReturnDetail } from 'src/app/shared/WarehouseReturnDetail.model';
import { WarehouseReturnDetailService } from 'src/app/shared/WarehouseReturnDetail.service';
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
  selector: 'app-warehouse-return-info',
  templateUrl: './warehouse-return-info.component.html',
  styleUrls: ['./warehouse-return-info.component.css']
})
export class WarehouseReturnInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "WarehouseReturnInfo";  
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public warehouseReturnService: WarehouseReturnService,
    public warehouseReturnDetailService: WarehouseReturnDetailService,
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
    this.productService.getByCompanyIDAndSearchStringToList(this.warehouseReturnService.formData.CompanyID, queryString).then(res => {
      this.productService.list = res as Product[];
      if (this.productService.list) {
        if (this.productService.list.length) {
          this.warehouseReturnDetailService.formData.ProductID = this.productService.list[0].ID;
          this.warehouseReturnDetailService.formData.Quantity = 1;
          this.warehouseReturnDetailService.formData.Price = 0;
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
    this.customerService.getByID(this.warehouseReturnService.formData.CustomerID).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        this.warehouseReturnService.formData.CustomerPhone = this.customerService.formData.Phone;
        this.warehouseReturnService.formData.AddressDelivery = this.customerService.formData.Address;
      }
    });
  }
  getCompanyByID() {
    this.companyService.getByID(this.warehouseReturnService.formData.CompanyID).then(res => {
      this.companyService.formData = res as Company;
      if (this.companyService.formData) {
        this.warehouseReturnService.formData.CompanyPhone = this.companyService.formData.Phone;
        this.warehouseReturnService.formData.AddressDelivery = this.companyService.formData.Address;
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
    this.warehouseReturnService.getByIDString(this.queryString).then(res => {
      this.warehouseReturnService.formData = res as WarehouseReturn;
      if (this.warehouseReturnService.formData) {
        if (this.warehouseReturnService.formData.ID) {
          this.getByParentIDToList();
        }
        if (this.warehouseReturnService.formData.CustomerID) {
          this.getCustomerByID();
        }
        if ((this.warehouseReturnService.formData.CustomerID == null) || (this.warehouseReturnService.formData.CustomerID == 0)) {
          if (this.customerService.list) {
            if (this.customerService.list.length) {
              this.warehouseReturnService.formData.CustomerID = this.customerService.list[0].ID;
              this.getCustomerByID();
            }
          }
        }  
        if ((this.warehouseReturnService.formData.CompanyID == null) || (this.warehouseReturnService.formData.CompanyID == 0)) {
          if (this.companyService.list) {
            if (this.companyService.list.length) {
              this.warehouseReturnService.formData.CompanyID = this.companyService.list[0].ID;
            }
          }
        }        
        this.getProductToList('');
        if ((this.warehouseReturnService.formData.StatusID == null) || (this.warehouseReturnService.formData.StatusID == 0)) {
          if (this.statusService.list) {
            if (this.statusService.list.length) {
              this.warehouseReturnService.formData.StatusID = this.statusService.list[0].ID;
            }
          }
        }
        if ((this.warehouseReturnService.formData.UserFoundedID == null) || (this.warehouseReturnService.formData.UserFoundedID == 0)) {
          this.warehouseReturnService.formData.UserFoundedID = this.notificationService.membershipID;
        }  
      }
      this.isShowLoading = false;
    });
  }
  getByID() {
    this.warehouseReturnService.getByID(this.warehouseReturnService.formData.ID).then(res => {
      this.warehouseReturnService.formData = res as WarehouseReturn;
    });
  }
  getByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseReturnDetailService.getByParentIDToList(this.warehouseReturnService.formData.ID).then(res => {
      this.warehouseReturnDetailService.list = res as WarehouseReturnDetail[];
      this.dataSource = new MatTableDataSource(this.warehouseReturnDetailService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }  
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.warehouseReturnService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.warehouseReturnService.formData = res as WarehouseReturn;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.warehouseReturnService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }  
  onSaveDetail(element: WarehouseReturnDetail) {
    if (this.warehouseReturnDetailService.formData) {
      if (this.warehouseReturnDetailService.formData.ID) {
        element.ParentID = this.warehouseReturnDetailService.formData.ID
        this.isShowLoading = true;
        this.warehouseReturnDetailService.save(element).subscribe(
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
    this.onSaveDetail(this.warehouseReturnDetailService.formData);
  }
  onUpdateDetail(element: WarehouseReturnDetail) {
    this.onSaveDetail(element);
  }
  onDeleteDetail(element: WarehouseReturnDetail) {
    if (confirm(environment.DeleteConfirm)) {
      this.warehouseReturnDetailService.remove(element.ID).then(res => {
        this.getByParentIDToList();
        this.getByID();
        this.notificationService.success(environment.DeleteSuccess);
      });
    }
  }
}