import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MembershipCustomer } from 'src/app/shared/MembershipCustomer.model';
import { MembershipCustomerService } from 'src/app/shared/MembershipCustomer.service';
import { CustomerPrice } from 'src/app/shared/CustomerPrice.model';
import { CustomerPriceService } from 'src/app/shared/CustomerPrice.service';
import { OrderService } from 'src/app/shared/Order.service';
import { OrderDetail } from 'src/app/shared/OrderDetail.model';
import { OrderDetailService } from 'src/app/shared/OrderDetail.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isShowLoading: boolean = false;
  isWishlist: boolean = true;
  searchString: string = environment.InitializationString;
  parentID: number = 1;
  orderID: number = 0;
  constructor(
    public membershipCustomerService: MembershipCustomerService,
    public customerPriceService: CustomerPriceService,
    public orderDetailService: OrderDetailService,
    public orderService: OrderService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCustomerToList('');    
  }
  getCustomerToList(searchString: string) {
    var membershipID = localStorage.getItem("MembershipID");
    if (membershipID) {
      this.membershipCustomerService.getByParentIDAndActiveAndSearchStringToList(Number(membershipID), true, searchString).then(res => {
        this.membershipCustomerService.list = res as MembershipCustomer[];
        if (this.membershipCustomerService.list) {
          if (this.membershipCustomerService.list.length) {
            this.parentID = this.membershipCustomerService.list[0].CustomerID;   
            this.getToList();         
          }
        }
      });
    }
  }
  getToList() {
    this.isShowLoading = true;
    this.orderService.orderCustomerID = this.parentID;
    this.customerPriceService.getByParentIDAndSearchStringAndIsWishlistToList(this.parentID, this.searchString, this.isWishlist).then(res => {
      this.customerPriceService.list = res as CustomerPrice[];
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.getToList();
  }
  onChangeMembershipCustomer($event) {
    this.orderDetailService.listShoppingCart = [];
  }
  onFilterMembershipCustomer(searchString: string) {
    this.getCustomerToList(searchString);
  }
  onSaveCustomerPrice(item: CustomerPrice) {
    item.IsWishlist = true;
    this.customerPriceService.save(item).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
      }
    );
  }
  onSaveOrderDetail(item: CustomerPrice) {
    if (item) {
      this.orderDetailService.formDataShoppingCart = {
      }
      this.orderDetailService.formDataShoppingCart.ParentID = this.orderID;
      this.orderDetailService.formDataShoppingCart.ProductID = item.ProductID;
      this.orderDetailService.formDataShoppingCart.ProductDisplay = item.ProductDisplay;
      this.orderDetailService.formDataShoppingCart.ProductImageURL = item.ProductImageURL;
      this.orderDetailService.formDataShoppingCart.Quantity = item.SortOrder;
      var check = 0;
      for (var i = 0; i < this.orderDetailService.listShoppingCart.length; i++) {
        if (this.orderDetailService.listShoppingCart[i].ProductID == this.orderDetailService.formDataShoppingCart.ProductID) {
          this.orderDetailService.listShoppingCart[i].Quantity = this.orderDetailService.listShoppingCart[i].Quantity + this.orderDetailService.formDataShoppingCart.Quantity;
          check = 1;
        }
      }
      if (check == 0) {
        this.orderDetailService.listShoppingCart.push(this.orderDetailService.formDataShoppingCart);
      }
      this.notificationService.success(environment.SaveSuccess);
    }
  }
  onSaveOrrder() {
    if (this.parentID) {
      if (this.orderDetailService.listShoppingCart) {
        if (this.orderDetailService.listShoppingCart.length) {
          this.isShowLoading = true;
          this.orderService.saveShoppingCart(this.orderDetailService.listShoppingCart, this.parentID, this.orderID).subscribe(
            data => {
              this.orderID = Number(data);
              this.isShowLoading = false;
              this.notificationService.success(environment.SaveSuccess);
              this.orderDetailService.listShoppingCart = [];
            },
            err => {
              this.notificationService.warn(environment.SaveNotSuccess);
              this.isShowLoading = false;
            }
          );
        }
        else {
          this.notificationService.warn("Giỏ hàng trống. Vui lòng chọn sản phẩm.");
        }
      }
      else {
        this.notificationService.warn("Giỏ hàng trống. Vui lòng chọn sản phẩm.");
      }
    }
    else {
      this.notificationService.warn("Khách hàng trống. Vui lòng chọn khách hàng.");
    }
  }
}
