import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseExportDetail } from 'src/app/shared/WarehouseExportDetail.model';
import { WarehouseExportDetailService } from 'src/app/shared/WarehouseExportDetail.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { DownloadService } from 'src/app/shared/Download.service';

@Component({
  selector: 'app-warehouse-by-date',
  templateUrl: './warehouse-by-date.component.html',
  styleUrls: ['./warehouse-by-date.component.css']
})
export class WarehouseByDateComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateUpdated', 'Code', 'Display', 'ProductDisplay', 'UnitDisplay', 'Quantity', 'QuantityExport', 'QuantityExport02'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  dateNow = new Date();
  dateBegin: Date = new Date();
  dateEnd: Date = new Date();
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "ProductInfo";
  constructor(
    public warehouseExportDetailService: WarehouseExportDetailService,
    public downloadService: DownloadService,
    public notificationService: NotificationService,    
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {
    this.isShowLoading = true;
    this.warehouseExportDetailService.getByDateBeginAndDateEndToList(this.dateBegin, this.dateEnd).then(res => {
      this.warehouseExportDetailService.list = res as WarehouseExportDetail[];
      console.log(this.warehouseExportDetailService.list);
      this.dataSource = new MatTableDataSource(this.warehouseExportDetailService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.getToList();
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.warehouseExportDetailByDateBeginAndDateEndToHTML(this.dateBegin, this.dateEnd).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}