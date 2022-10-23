import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/app/shared/Order.model';
import { OrderService } from 'src/app/shared/Order.service';
import { Status } from 'src/app/shared/Status.model';
import { StatusService } from 'src/app/shared/Status.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { DownloadService } from 'src/app/shared/Download.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'DateFounded', 'Code', 'UserFoundedDisplay', 'CustomerDisplay', 'TotalFinal', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "OrderInfo";
  URLOrderToWarehouseExport: string = environment.DomainDestination + "OrderToWarehouseExport";
  statusID: number = 1;
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  active: boolean = true;
  constructor(
    public orderService: OrderService,
    public statusService: StatusService,
    public downloadService: DownloadService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getStatusToList();
    this.getYearToList();
    this.getMonthToList();
    this.getToList();
  }
  getStatusToList() {
    this.statusService.getAllToList().then(res => {
      this.statusService.list = res as Status[];
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
    this.orderService.getByActiveAndStatusIDAndYearAndMonthAndSearchStringToList(this.active, this.statusID, this.year, this.month, this.searchString).then(res => {
      this.orderService.list = res as Order[];
      this.dataSource = new MatTableDataSource(this.orderService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.getToList();
  }
  onPrint(ID: number) {
    this.isShowLoading = true;
    this.downloadService.orderByIDToHTML(ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}
