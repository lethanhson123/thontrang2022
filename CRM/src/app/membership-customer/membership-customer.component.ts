import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Province } from 'src/app/shared/Province.model';
import { ProvinceService } from 'src/app/shared/Province.service';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { MembershipCustomer } from 'src/app/shared/MembershipCustomer.model';
import { MembershipCustomerService } from 'src/app/shared/MembershipCustomer.service';

@Component({
  selector: 'app-membership-customer',
  templateUrl: './membership-customer.component.html',
  styleUrls: ['./membership-customer.component.css']
})
export class MembershipCustomerComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'ProvinceName', 'CustomerCategoryName', 'CustomerName', 'Active'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;
  parentID: number = 1;  
  provinceID: number = 57;
  active: boolean = false;
  constructor(
    public provinceService: ProvinceService,
    public membershipService: MembershipService,
    public membershipCustomerService: MembershipCustomerService,
    public notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getMembershipToList();
  }
  getProvinceToList() {
    this.provinceService.getByActiveToList(true).then(res => {
      this.provinceService.list = res as Province[];
      if (this.provinceService.list) {
        if (this.provinceService.list.length > 0) {
          this.provinceID = this.provinceService.list[0].ID;
        }
      }
    });
  }
  getMembershipToList() {
    this.membershipService.getAllToList().then(res => {
      this.membershipService.list = res as Membership[];
      if (this.membershipService.list) {
        if (this.membershipService.list.length > 0) {
          this.parentID = this.membershipService.list[0].ID;
          this.getToList();
        }
      }
    });
  }
  getToList() {
    this.isShowLoading = true;
    this.membershipCustomerService.getByParentIDToList(this.parentID).then(res => {
      this.membershipCustomerService.list = res as MembershipCustomer[];
      this.dataSource = new MatTableDataSource(this.membershipCustomerService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  getToMatTableDataSource(list: MembershipCustomer[]) {
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
      for (var i = 0; i < this.membershipCustomerService.list.length; i++) {
        this.membershipCustomerService.list[i].Active = this.active;
      }
    }
    this.membershipCustomerService.saveItems(this.membershipCustomerService.list).subscribe(
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

