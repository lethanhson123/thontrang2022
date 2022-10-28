import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductIngredient } from 'src/app/shared/ProductIngredient.model';
import { ProductIngredientService } from 'src/app/shared/ProductIngredient.service';
import { ProductIngredientDetailComponent } from './product-ingredient-detail/product-ingredient-detail.component';


@Component({
  selector: 'app-product-ingredient',
  templateUrl: './product-ingredient.component.html',
  styleUrls: ['./product-ingredient.component.css']
})
export class ProductIngredientComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID','Name','Display', 'UnitDisplay', 'Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  constructor(
    public productIngredientService: ProductIngredientService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.productIngredientService.getAllToList().then(res => {
      this.productIngredientService.list = res as ProductIngredient[];   
      this.dataSource = new MatTableDataSource(this.productIngredientService.list.sort((a, b) => (a.Name > b.Name ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;    
      this.isShowLoading = false;  
    });
  }
  onSearch() {    
    if (this.searchString.length > 0) {
      this.dataSource.filter = this.searchString.toLowerCase();
    }
    else {
      this.getToList();
    }
  }
  onAdd(ID: any) {    
    this.productIngredientService.getByID(ID).then(res => {
      this.productIngredientService.formData = res as ProductIngredient;      
    });    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;    
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(ProductIngredientDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();      
    });    
  }
}