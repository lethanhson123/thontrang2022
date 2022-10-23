import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-product-statistical',
  templateUrl: './product-statistical.component.html',
  styleUrls: ['./product-statistical.component.css']
})
export class ProductStatisticalComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['Name', 'CompanyName', 'ParentName', 'QuantityImport', 'QuantityImport02', 'QuantityExport', 'QuantityExport02', 'QuantityInStock', 'QuantityInStock02', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  dateBegin: Date = new Date();
  dateEnd: Date = new Date();
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "ProductInfo";
  constructor(
    public productService: ProductService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }
  getToList() {
    this.isShowLoading = true;
    this.productService.getByDateBeginAndDateEndAndSearchStringToList(this.dateBegin, this.dateEnd, '').then(res => {
      this.productService.list = res as Product[];
      this.dataSource = new MatTableDataSource(this.productService.list);
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
}
