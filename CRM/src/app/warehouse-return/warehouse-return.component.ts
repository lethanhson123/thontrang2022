import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseReturn } from 'src/app/shared/WarehouseReturn.model';
import { WarehouseReturnService } from 'src/app/shared/WarehouseReturn.service';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { DownloadService } from 'src/app/shared/Download.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-warehouse-return',
  templateUrl: './warehouse-return.component.html',
  styleUrls: ['./warehouse-return.component.css']
})
export class WarehouseReturnComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID','DateFounded', 'Code', 'UserFoundedDisplay', 'CustomerDisplay', 'TotalFinal', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "WarehouseReturnInfo";
  companyID: number = 1;
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  active: boolean = true;
  constructor(
    public warehouseReturnService: WarehouseReturnService,
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
    this.warehouseReturnService.getByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(this.active, this.companyID, this.year, this.month, this.searchString).then(res => {
      this.warehouseReturnService.list = res as WarehouseReturn[];
      this.dataSource = new MatTableDataSource(this.warehouseReturnService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.getToList();
  }

}