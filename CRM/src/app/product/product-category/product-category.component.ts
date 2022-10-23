import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductCategory } from 'src/app/shared/ProductCategory.model';
import { ProductCategoryService } from 'src/app/shared/ProductCategory.service';
import { ProductCategoryDetailComponent } from './product-category-detail/product-category-detail.component';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['UserUpdated','DateUpdated','ID','Name','Display','Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  constructor(
    public productCategoryService: ProductCategoryService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.productCategoryService.getBySearchStringToList(this.searchString).then(res => {
      this.productCategoryService.list = res as ProductCategory[];   
      this.dataSource = new MatTableDataSource(this.productCategoryService.list.sort((a, b) => (a.Name > b.Name ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;    
      this.isShowLoading = false;  
    });
  }
  onSearch() {    
    this.getToList();
  }
  onAdd(ID: any) {    
    this.productCategoryService.getByID(ID).then(res => {
      this.productCategoryService.formData = res as ProductCategory;      
    });    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;    
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(ProductCategoryDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();      
    });    
  }
}