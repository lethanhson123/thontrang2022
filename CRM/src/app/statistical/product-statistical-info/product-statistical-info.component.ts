import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { ReportService } from 'src/app/shared/Report.service';
import { WarehouseDetailDataTransfer } from 'src/app/shared/WarehouseDetailDataTransfer.model';

@Component({
  selector: 'app-product-statistical-info',
  templateUrl: './product-statistical-info.component.html',
  styleUrls: ['./product-statistical-info.component.css']
})
export class ProductStatisticalInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateFounded', 'Code', 'CompanyDisplay',  'CustomerDisplay','QuantityImport', 'QuantityImport02', 'QuantityExport', 'QuantityExport02'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "CustomerDebtInfo";
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
 
  constructor(
    public router: Router,
    public notificationService: NotificationService,    
    public productService: ProductService,
    public reportService: ReportService,
    private dialog: MatDialog
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getByQueryString() {
    this.isShowLoading = true;
    this.productService.getByIDString(this.queryString).then(res => {
      this.productService.formData = res as Product;      
      if (this.productService.formData) {
        if (this.productService.formData.ID) {
          this.theKhoByProductIDToList();
        }
      }
      this.isShowLoading = false;
    });
  }
  theKhoByProductIDToList() {
    this.isShowLoading = true;
    this.reportService.theKhoByProductIDToList(this.productService.formData.ID).then(res => {
      this.reportService.listWarehouseDetailDataTransfer = res as WarehouseDetailDataTransfer[];
      this.dataSource = new MatTableDataSource(this.reportService.listWarehouseDetailDataTransfer);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onPrint() {
    this.isShowLoading = true;
    this.reportService.tonKhoThanhPhamByProductIDToHTML(this.productService.formData.ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}