import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/notification.service';
import { WarehouseExportPayment } from 'src/app/shared/WarehouseExportPayment.model';
import { WarehouseExportPaymentService } from 'src/app/shared/WarehouseExportPayment.service';
import { WarehouseExportService } from 'src/app/shared/WarehouseExport.service';

@Component({
  selector: 'app-warehouse-export-payment',
  templateUrl: './warehouse-export-payment.component.html',
  styleUrls: ['./warehouse-export-payment.component.css']
})
export class WarehouseExportPaymentComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DatePay', 'TotalPay', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ID: number = environment.InitializationNumber;
  isShowLoading: boolean = false;
  URLWarehouseImport: string = environment.DomainDestination + "WarehouseImportInfo";
  constructor(
    public warehouseExportService: WarehouseExportService,
    public warehouseExportPaymentService: WarehouseExportPaymentService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<WarehouseExportPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ID = data["ID"] as number;
    this.getWarehouseExportPaymentToList();
  }
  ngOnInit(): void {
  }
  getWarehouseExportPaymentToList() {
    this.isShowLoading = true;
    this.warehouseExportPaymentService.formData.ParentID = this.warehouseExportService.ID;
    this.warehouseExportPaymentService.getByParentIDToList(this.warehouseExportService.ID).then(res => {
      this.warehouseExportPaymentService.list = res as WarehouseExportPayment[];
      this.dataSource = new MatTableDataSource(this.warehouseExportPaymentService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSave() {
    this.warehouseExportPaymentService.save(this.warehouseExportPaymentService.formData).subscribe(
      res => {
        this.getWarehouseExportPaymentToList();       
        this.notificationService.success(environment.SaveSuccess);                
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);        
      }
    );
  }
  onDelete(element: WarehouseExportPayment) {
    if (confirm(environment.DeleteConfirm)) {
      this.warehouseExportPaymentService.remove(element.ID).then(res => {
        this.getWarehouseExportPaymentToList();       
        this.notificationService.success(environment.DeleteSuccess);
      });
    }
  }
}