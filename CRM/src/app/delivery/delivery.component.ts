import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Delivery } from 'src/app/shared/Delivery.model';
import { DeliveryService } from 'src/app/shared/Delivery.service';
import { DownloadService } from 'src/app/shared/Download.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateFounded', 'ProvinceName', 'Weight', 'TruckNumberControl', 'TruckPhone', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  dateBegin: Date = new Date();
  dateEnd: Date = new Date();
  searchString: string = environment.InitializationString;
  URLSub: string = environment.DomainDestination + "DeliveryInfo";
  constructor(
    public deliveryService: DeliveryService,
    public downloadService: DownloadService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.onSearch();
  }
  getToList() {
    this.isShowLoading = true;
    this.deliveryService.getByDateBeginAndDateEndToList(this.dateBegin, this.dateEnd).then(res => {
      this.deliveryService.list = res as Delivery[];
      this.dataSource = new MatTableDataSource(this.deliveryService.list);
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
  onPrint(ID: number) {
    this.isShowLoading = true;
    this.downloadService.deliveryByIDToHTML(ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}