import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { ReportService } from 'src/app/shared/Report.service';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-product-ingredient-statistical',
  templateUrl: './product-ingredient-statistical.component.html',
  styleUrls: ['./product-ingredient-statistical.component.css']
})
export class ProductIngredientStatisticalComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductIngredientDisplay', 'UnitDisplay', 'QuantityImport','QuantityExport','QuantityInStock','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  URLSub: string = environment.DomainDestination + "ProductIngredientStatisticalInfo";
  constructor(    
    public notificationService: NotificationService,
    public reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.reportService.tonKhoGocThuocToList().then(res => {
      this.reportService.listProduct = res as Product[];    
      this.dataSource = new MatTableDataSource(this.reportService.listProduct);
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
  onPrint(productIngredientID: number) {
    this.isShowLoading = true;
    this.reportService.tonKhoGocThuocByProductIngredientIDToHTML(productIngredientID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}