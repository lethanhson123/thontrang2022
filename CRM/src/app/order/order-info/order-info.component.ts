import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/app/shared/Order.model';
import { OrderService } from 'src/app/shared/Order.service';
import { OrderDetail } from 'src/app/shared/OrderDetail.model';
import { OrderDetailService } from 'src/app/shared/OrderDetail.service';
import { Status } from 'src/app/shared/Status.model';
import { StatusService } from 'src/app/shared/Status.service';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { Unit } from 'src/app/shared/Unit.model';
import { UnitService } from 'src/app/shared/Unit.service';
import { DownloadService } from 'src/app/shared/Download.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'Save', 'Delete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "OrderInfo";
  URLOrderToWarehouseExport: string = "OrderToWarehouseExport";
  productID: number = 1;
  unitID: number = 7;
  quantity: number = 1;
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public orderService: OrderService,
    public orderDetailService: OrderDetailService,
    public statusService: StatusService,
    public customerService: CustomerService,
    public membershipService: MembershipService,
    public productService: ProductService,
    public unitService: UnitService,
    public downloadService: DownloadService,
  ) {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getProductToList('');        
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
    this.productService.getBySearchStringToList(queryString).then(res => {
      this.productService.list = res as Product[];
      if (this.productService.list) {
        if (this.productService.list.length) {
          this.orderDetailService.formData.ProductID = this.productService.list[0].ID;
          this.orderDetailService.formData.Quantity = 1;
          this.orderDetailService.formData.Price = 0;
        }
      }
    });
  }  
  getCustomerToList() {
    this.customerService.getAllToList().then(res => {
      this.customerService.list = res as Customer[];
    });
  }
  getCustomerByID() {
    this.customerService.getByID(this.orderService.formData.CustomerID).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        this.orderService.formData.CustomerPhone = this.customerService.formData.Phone;
        this.orderService.formData.AddressDelivery = this.customerService.formData.Address;
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
  onFilterProduct(searchString: string) {
    this.getProductToList(searchString);
  }
  getByQueryString() {
    this.isShowLoading = true;
    this.orderService.getByIDString(this.queryString).then(res => {
      this.orderService.formData = res as Order;
      if (this.orderService.formData) {
        if (this.orderService.formData.ID) {
          this.URLOrderToWarehouseExport = environment.DomainDestination + this.URLOrderToWarehouseExport + "/" + this.orderService.formData.ID;
          console.log();
          this.getByParentIDToList();
        }
        if (this.orderService.formData.CustomerID) {
          this.getCustomerByID();
        }
        if ((this.orderService.formData.CustomerID == null) || (this.orderService.formData.CustomerID == 0)) {
          if (this.customerService.list) {
            if (this.customerService.list.length) {
              this.orderService.formData.CustomerID = this.customerService.list[0].ID;
              this.getCustomerByID();
            }
          }
        }
        if ((this.orderService.formData.StatusID == null) || (this.orderService.formData.StatusID == 0)) {
          if (this.statusService.list) {
            if (this.statusService.list.length) {
              this.orderService.formData.StatusID = this.statusService.list[0].ID;
            }
          }
        }
        if ((this.orderService.formData.UserFoundedID == null) || (this.orderService.formData.UserFoundedID == 0)) {
          this.orderService.formData.UserFoundedID = this.notificationService.membershipID;
        }
      }
      this.isShowLoading = false;
    });
  }
  getByID() {
    this.orderService.getByID(this.orderService.formData.ID).then(res => {
      this.orderService.formData = res as Order;
    });
  }
  getByParentIDToList() {
    this.isShowLoading = true;
    this.orderDetailService.getByParentIDToList(this.orderService.formData.ID).then(res => {
      this.orderDetailService.list = res as OrderDetail[];
      this.dataSource = new MatTableDataSource(this.orderDetailService.list.sort((a, b) => (a.ID > b.ID ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.orderService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.orderService.formData = res as Order;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.orderService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }

  onSaveDetail(element: OrderDetail) {
    if (this.orderService.formData) {
      if (this.orderService.formData.ID) {
        element.ParentID = this.orderService.formData.ID
        this.isShowLoading = true;
        this.orderDetailService.save(element).subscribe(
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
        this.notificationService.warn("Thông tin đơn hàng chưa lưu thay đổi.");
      }
    }
    else {
      this.notificationService.warn("Thông tin đơn hàng chưa lưu thay đổi.");
    }
  }
  onAddDetail() {
    this.onSaveDetail(this.orderDetailService.formData);
  }
  onUpdateDetail(element: OrderDetail) {
    this.onSaveDetail(element);
  }
  onDeleteDetail(element: OrderDetail) {
    if (confirm(environment.DeleteConfirm)) {
      this.orderDetailService.remove(element.ID).then(res => {
        this.getByParentIDToList();
        this.getByID();
        this.notificationService.success(environment.DeleteSuccess);
      });
    }
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.orderByIDToHTML(this.orderService.formData.ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}