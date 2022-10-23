import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/shared/Product.model';
import { ReportService } from 'src/app/shared/Report.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProductDataTransfer } from '../shared/ProductDataTransfer.model';

@Component({
  selector: 'app-product-by-date',
  templateUrl: './product-by-date.component.html',
  styleUrls: ['./product-by-date.component.css']
})
export class ProductByDateComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductImageURL', 'ProductDisplay', 'TonDauKy', 'QuantityImport', 'QuantityExport', 'TonCuoiKy', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  dateNow = new Date();
  dateBegin: Date = new Date();
  dateEnd: Date = new Date();
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "ProductByyDateInfo";
  constructor(
    public reportService: ReportService,    
    public notificationService: NotificationService,    
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {   
    this.isShowLoading = true;
    this.reportService.theKhoByDateBeginAndDateEndToList(this.dateBegin, this.dateEnd).then(res => {
      this.reportService.listProductDataTransfer = res as ProductDataTransfer[];
      this.dataSource = new MatTableDataSource(this.reportService.listProductDataTransfer);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }

  onSearch() {
    this.getToList();
  }
  onPrint(productID: number) {    
    this.isShowLoading = true;
    this.reportService.tonKhoThanhPhamByProductIDAndDateBeginAndDateEndToHTML(productID, this.dateBegin, this.dateEnd).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}