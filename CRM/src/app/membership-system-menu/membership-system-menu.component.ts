import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { MembershipSystemMenu } from 'src/app/shared/MembershipSystemMenu.model';
import { MembershipSystemMenuService } from 'src/app/shared/MembershipSystemMenu.service';

@Component({
  selector: 'app-membership-system-menu',
  templateUrl: './membership-system-menu.component.html',
  styleUrls: ['./membership-system-menu.component.css']
})
export class MembershipSystemMenuComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['SystemMenuParentID','SystemMenuName', 'Active'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;
  parentID: number = 1;  
  provinceID: number = 57;
  active: boolean = false;
  constructor(    
    public membershipService: MembershipService,
    public membershipSystemMenuService: MembershipSystemMenuService,
    public notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getMembershipToList();
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
    this.membershipSystemMenuService.getByParentIDToList(this.parentID).then(res => {
      this.membershipSystemMenuService.list = res as MembershipSystemMenu[];
      this.dataSource = new MatTableDataSource(this.membershipSystemMenuService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  getToMatTableDataSource(list: MembershipSystemMenu[]) {
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
  onChangeActive($event) {
    for (var i = 0; i < this.membershipSystemMenuService.list.length; i++) {
      this.membershipSystemMenuService.list[i].Active = this.active;
    }
  }
  onSave() {
    this.isShowLoading = true;
    if (this.active == true) {
      for (var i = 0; i < this.membershipSystemMenuService.list.length; i++) {
        this.membershipSystemMenuService.list[i].Active = this.active;
      }
    }
    this.membershipSystemMenuService.saveItems(this.membershipSystemMenuService.list).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.SaveSuccess);

      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
}