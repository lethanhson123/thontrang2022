import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseCancel } from 'src/app/shared/WarehouseCancel.model';
import { WarehouseCancelService } from 'src/app/shared/WarehouseCancel.service';
import { WarehouseCancelDetail } from 'src/app/shared/WarehouseCancelDetail.model';
import { WarehouseCancelDetailService } from 'src/app/shared/WarehouseCancelDetail.service';
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
  selector: 'app-warehouse-cancel-info',
  templateUrl: './warehouse-cancel-info.component.html',
  styleUrls: ['./warehouse-cancel-info.component.css']
})
export class WarehouseCancelInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "WarehouseCancelInfo";
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public warehouseCancelService: WarehouseCancelService,
    public warehouseCancelDetailService: WarehouseCancelDetailService,
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
    this.productService.getByCompanyIDAndSearchStringToList(this.warehouseCancelService.formData.CompanyID, queryString).then(res => {
      this.productService.list = res as Product[];
      if (this.productService.list) {
        if (this.productService.list.length) {
          this.warehouseCancelDetailService.formData.ProductID = this.productService.list[0].ID;
          this.warehouseCancelDetailService.formData.Quantity = 1;
          this.warehouseCancelDetailService.formData.Price = 0;
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
    this.customerService.getByID(this.warehouseCancelService.formData.CustomerID).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        this.warehouseCancelService.formData.CustomerPhone = this.customerService.formData.Phone;
        this.warehouseCancelService.formData.AddressDelivery = this.customerService.formData.Address;
      }
    });
  }
  getCompanyByID() {
    this.companyService.getByID(this.warehouseCancelService.formData.CompanyID).then(res => {
      this.companyService.formData = res as Company;
      if (this.companyService.formData) {
        this.warehouseCancelService.formData.CompanyPhone = this.companyService.formData.Phone;
        this.warehouseCancelService.formData.AddressDelivery = this.companyService.formData.Address;
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
    this.warehouseCancelService.getByIDString(this.queryString).then(res => {
      this.warehouseCancelService.formData = res as WarehouseCancel;
      if (this.warehouseCancelService.formData) {
        if (this.warehouseCancelService.formData.ID) {
          this.getByParentIDToList();
        }
        if (this.warehouseCancelService.formData.CustomerID) {
          this.getCustomerByID();
        }
        if ((this.warehouseCancelService.formData.CustomerID == null) || (this.warehouseCancelService.formData.CustomerID == 0)) {
          if (this.customerService.list) {
            if (this.customerService.list.length) {
              this.warehouseCancelService.formData.CustomerID = this.customerService.list[0].ID;
              this.getCustomerByID();
            }
          }
        }
        if ((this.warehouseCancelService.formData.CompanyID == null) || (this.warehouseCancelService.formData.CompanyID == 0)) {
          if (this.companyService.list) {
            if (this.companyService.list.length) {
              this.warehouseCancelService.formData.CompanyID = this.companyService.list[0].ID;              
            }
          }
        }
        this.getProductToList('');
        if ((this.warehouseCancelService.formData.StatusID == null) || (this.warehouseCancelService.formData.StatusID == 0)) {
          if (this.statusService.list) {
            if (this.statusService.list.length) {
              this.warehouseCancelService.formData.StatusID = this.statusService.list[0].ID;
            }
          }
        }
        if ((this.warehouseCancelService.formData.UserFoundedID == null) || (this.warehouseCancelService.formData.UserFoundedID == 0)) {
          this.warehouseCancelService.formData.UserFoundedID = this.notificationService.membershipID;
        }
      }
      this.isShowLoading = false;
    });
  }
  getByID() {
    this.warehouseCancelService.getByID(this.warehouseCancelService.formData.ID).then(res => {
      this.warehouseCancelService.formData = res as WarehouseCancel;
    });
  }
  getByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseCancelDetailService.getByParentIDToList(this.warehouseCancelService.formData.ID).then(res => {
      this.warehouseCancelDetailService.list = res as WarehouseCancelDetail[];
      this.dataSource = new MatTableDataSource(this.warehouseCancelDetailService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.warehouseCancelService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.warehouseCancelService.formData = res as WarehouseCancel;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.warehouseCancelService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
  
  onSaveDetail(element: WarehouseCancelDetail) {
    if (this.warehouseCancelDetailService.formData) {
      if (this.warehouseCancelDetailService.formData.ID) {
        element.ParentID = this.warehouseCancelDetailService.formData.ID
        this.isShowLoading = true;
        this.warehouseCancelDetailService.save(element).subscribe(
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
        this.notificationService.warn("Th??ng tin phi???u ch??a l??u thay ?????i.");
      }
    }
    else {
      this.notificationService.warn("Th??ng tin phi???u ch??a l??u thay ?????i.");
    }
  }
  onAddDetail() {
    this.onSaveDetail(this.warehouseCancelDetailService.formData);
  }
  onUpdateDetail(element: WarehouseCancelDetail) {
    this.onSaveDetail(element);
  }
  onDeleteDetail(element: WarehouseCancelDetail) {
    if (confirm(environment.DeleteConfirm)) {
      this.warehouseCancelDetailService.remove(element.ID).then(res => {
        this.getByParentIDToList();
        this.getByID();
        this.notificationService.success(environment.DeleteSuccess);
      });
    }
  }
}