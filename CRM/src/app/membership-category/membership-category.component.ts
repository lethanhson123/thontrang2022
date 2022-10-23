import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MembershipCategory } from 'src/app/shared/MembershipCategory.model';
import { MembershipCategoryService } from 'src/app/shared/MembershipCategory.service';
import { MembershipCategoryDetailComponent } from './membership-category-detail/membership-category-detail.component';

@Component({
  selector: 'app-membership-category',
  templateUrl: './membership-category.component.html',
  styleUrls: ['./membership-category.component.css']
})
export class MembershipCategoryComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['UserUpdated','DateUpdated','ID','Name','Display','Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  
  constructor(
    public membershipCategoryService: MembershipCategoryService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.membershipCategoryService.getBySearchStringToList(this.searchString).then(res => {
      this.membershipCategoryService.list = res as MembershipCategory[];      
      this.dataSource = new MatTableDataSource(this.membershipCategoryService.list.sort((a, b) => (a.Name > b.Name ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
      this.isShowLoading = false;
    });
  }
  onSearch() {    
    this.getToList();
  }
  onAdd(ID: any) {    
    this.membershipCategoryService.getByID(ID).then(res => {
      this.membershipCategoryService.formData = res as MembershipCategory;      
    });    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;    
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(MembershipCategoryDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();      
    });    
  }
}
