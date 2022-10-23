import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { CustomerPrice } from 'src/app/shared/CustomerPrice.model';
import { CustomerPriceService } from 'src/app/shared/CustomerPrice.service';

@Component({
  selector: 'app-customer-price',
  templateUrl: './customer-price.component.html',
  styleUrls: ['./customer-price.component.css']
})
export class CustomerPriceComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'ProductImageURL', 'ProductDisplay', 'Price', 'IsWishlist'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  active: boolean = false;  
  searchString: string = environment.InitializationString;
  parentID: number = 1;
  customerPriceByIsWishlist: number = 0;
  constructor(
    public customerService: CustomerService,
    public customerPriceService: CustomerPriceService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCustomerToList();
  }
  getCustomerToList() {
    this.isShowLoading = true;
    this.customerService.getAllToList().then(res => {
      this.customerService.list = res as Customer[];
      if (this.customerService.list) {
        if (this.customerService.list.length > 0) {
          this.parentID = this.customerService.list[0].ID;
          this.getToList();
          this.isShowLoading = false;
        }
      }
    });
  }
  getToList() {
    this.isShowLoading = true;
    this.customerPriceService.getByParentIDToList(this.parentID).then(res => {
      this.customerPriceService.list = res as CustomerPrice[];
      this.dataSource = new MatTableDataSource(this.customerPriceService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getCustomerPriceByIsWishlist();
      this.isShowLoading = false;
    });
  }
  getCustomerPriceByIsWishlist() {
    for (var i = 0; i < this.customerPriceService.list.length; i++) {
      if (this.customerPriceService.list[i].IsWishlist == true) {
        this.customerPriceByIsWishlist = this.customerPriceByIsWishlist + 1;
      }
    }
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onChangeParentID($event) {
    this.getToList();
  }
  onSave() {
    this.isShowLoading = true;
    if (this.active == true) {
      for (var i = 0; i < this.customerPriceService.list.length; i++) {
        this.customerPriceService.list[i].Active = this.active;
      }
    }
    this.customerPriceService.saveItems(this.customerPriceService.list).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.UploadSuccess);

      },
      err => {
        this.notificationService.warn(environment.UploadNotSuccess);
        this.isShowLoading = false;
      }
    );
  }

}

