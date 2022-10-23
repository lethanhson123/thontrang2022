import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseExport } from 'src/app/shared/WarehouseExport.model';
import { WarehouseExportService } from 'src/app/shared/WarehouseExport.service';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { DownloadService } from 'src/app/shared/Download.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-warehouse-export',
  templateUrl: './warehouse-export.component.html',
  styleUrls: ['./warehouse-export.component.css']
})
export class WarehouseExportComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID','DateFounded', 'Code', 'UserFoundedDisplay', 'CustomerDisplay', 'TotalFinal','TotalPay','TotalDebt', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "WarehouseExportInfo";
  companyID: number = 1;
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  active: boolean = true;
  constructor(
    public warehouseExportService: WarehouseExportService,
    public companyService: CompanyService,
    public downloadService: DownloadService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCompanyToList();
    this.getYearToList();
    this.getMonthToList();
    this.getToList();
  }
  getCompanyToList() {        
    this.companyService.getAllToList().then(res => {
      this.companyService.list = res as Company[];            
    });
  }
  getYearToList() {        
    this.downloadService.getYearToList().then(res => {
      this.downloadService.listYear = res as YearMonth[];            
    });
  }
  getMonthToList() {        
    this.downloadService.getMonthToList().then(res => {
      this.downloadService.listMonth = res as YearMonth[];            
    });
  }
  getToList() {
    this.isShowLoading = true;
    this.warehouseExportService.getByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(this.active, this.companyID, this.year, this.month, this.searchString).then(res => {
      this.warehouseExportService.list = res as WarehouseExport[];
      this.dataSource = new MatTableDataSource(this.warehouseExportService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.getToList();
  }

}
