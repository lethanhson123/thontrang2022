import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerCategory } from 'src/app/shared/CustomerCategory.model';
import { CustomerCategoryService } from 'src/app/shared/CustomerCategory.service';
import { CustomerCategoryDetailComponent } from './customer-category-detail/customer-category-detail.component';

@Component({
  selector: 'app-customer-category',
  templateUrl: './customer-category.component.html',
  styleUrls: ['./customer-category.component.css']
})
export class CustomerCategoryComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['UserUpdated','DateUpdated','ID','Name','Display','Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  
  constructor(
    public customerCategoryService: CustomerCategoryService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.customerCategoryService.getBySearchStringToList(this.searchString).then(res => {
      this.customerCategoryService.list = res as CustomerCategory[];      
      this.dataSource = new MatTableDataSource(this.customerCategoryService.list.sort((a, b) => (a.Name > b.Name ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
      this.isShowLoading = false;
    });
  }
  onSearch() {    
    this.getToList();
  }
  onAdd(ID: any) {    
    this.customerCategoryService.getByID(ID).then(res => {
      this.customerCategoryService.formData = res as CustomerCategory;      
    });    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;    
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(CustomerCategoryDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();      
    });    
  }
}