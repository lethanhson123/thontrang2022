import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { WarehouseExportDetail } from 'src/app/shared/WarehouseExportDetail.model';
import { WarehouseExportDetailService } from 'src/app/shared/WarehouseExportDetail.service';
import { WarehouseExportDetailSource } from 'src/app/shared/WarehouseExportDetailSource.model';
import { WarehouseExportDetailSourceService } from 'src/app/shared/WarehouseExportDetailSource.service';

@Component({
  selector: 'app-warehouse-export-detail-source',
  templateUrl: './warehouse-export-detail-source.component.html',
  styleUrls: ['./warehouse-export-detail-source.component.css']
})
export class WarehouseExportDetailSourceComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateFounded', 'Code', 'ProductDisplay', 'UnitDisplay', 'QuantitySource', 'Quantity', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ID: number = environment.InitializationNumber;
  isShowLoading: boolean = false;
  URLWarehouseImport: string = environment.DomainDestination + "WarehouseImportInfo";
  constructor(
    public warehouseExportDetailService: WarehouseExportDetailService,
    public warehouseExportDetailSourceService: WarehouseExportDetailSourceService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<WarehouseExportDetailSourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ID = data["ID"] as number;
    this.getWarehouseImportDetailToList();
  }
  ngOnInit(): void {
  }
  getWarehouseImportDetailToList() {
    this.isShowLoading = true;
    this.warehouseExportDetailSourceService.getByParentIDToList(this.warehouseExportDetailService.formDataWarehouseExportDetailSource.ID).then(res => {
      this.warehouseExportDetailSourceService.list = res as WarehouseExportDetailSource[];
      this.dataSource = new MatTableDataSource(this.warehouseExportDetailSourceService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSave(element: WarehouseExportDetailSource) {    
    this.warehouseExportDetailSourceService.save(element).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.onClose();
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.onClose();
      }
    );
  }
}
