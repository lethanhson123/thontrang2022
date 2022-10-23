import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseExport } from 'src/app/shared/WarehouseExport.model';
import { WarehouseExportService } from 'src/app/shared/WarehouseExport.service';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { ReportService } from 'src/app/shared/Report.service';

@Component({
  selector: 'app-customer-debt-info',
  templateUrl: './customer-debt-info.component.html',
  styleUrls: ['./customer-debt-info.component.css']
})
export class CustomerDebtInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['CompanyDisplay', 'Code', 'DateFounded', 'TotalFinal', 'TotalPay', 'TotalDebt'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "CustomerDebtInfo";
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;

  dateNow = new Date();
  dateBegin: Date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth(), 1);
  dateEnd: Date = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1, 0);  
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public warehouseExportService: WarehouseExportService,
    public customerService: CustomerService,
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
    this.customerService.getByIDString(this.queryString).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        if (this.customerService.formData.ID) {
          this.getByActiveAndCustomerIDToList();
        }
      }
      this.isShowLoading = false;
    });
  }
  getByActiveAndCustomerIDToList() {
    this.isShowLoading = true;
    this.warehouseExportService.getByActiveAndCustomerIDToList(true, this.customerService.formData.ID).then(res => {
      this.warehouseExportService.list = res as WarehouseExport[];
      this.dataSource = new MatTableDataSource(this.warehouseExportService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onChiTietBanHangByCustomerIDAndDateBeginAndDateEndToHTML() {
    this.isShowLoading = true;
    this.reportService.chiTietBanHangByCustomerIDAndDateBeginAndDateEndToHTML(this.customerService.formData.ID, this.dateBegin, this.dateEnd).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onCongNoDoiChieuByCustomerIDAndDateBeginAndDateEndToHTML() {
    this.isShowLoading = true;
    this.reportService.congNoDoiChieuByCustomerIDAndDateBeginAndDateEndToHTML(this.customerService.formData.ID, this.dateBegin, this.dateEnd).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onCongNoPhaiThuByCustomerIDAndDateBeginAndDateEndToHTML() {
    this.isShowLoading = true;
    this.reportService.congNoPhaiThuByCustomerIDAndDateBeginAndDateEndToHTML(this.customerService.formData.ID, this.dateBegin, this.dateEnd).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}
