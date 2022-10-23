import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Delivery } from 'src/app/shared/Delivery.model';
import { DeliveryService } from 'src/app/shared/Delivery.service';
import { DeliveryDetail } from 'src/app/shared/DeliveryDetail.model';
import { DeliveryDetailService } from 'src/app/shared/DeliveryDetail.service';
import { Province } from 'src/app/shared/Province.model';
import { ProvinceService } from 'src/app/shared/Province.service';
import { Truck } from 'src/app/shared/Truck.model';
import { TruckService } from 'src/app/shared/Truck.service';
import { DownloadService } from 'src/app/shared/Download.service';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateFounded', 'CustomerDisplay', 'CustomerPhone', 'AddressDelivery', 'Weight'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "CustomerInfo";
  provinceID: number = 51;
  districtID: number = 583;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public provinceService: ProvinceService,
    public deliveryService: DeliveryService,
    public deliveryDetailService: DeliveryDetailService,
    public truckService: TruckService,
    public downloadService: DownloadService,
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getTruckToList();
        this.getProvinceToList();
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getTruckToList() {
    this.truckService.getAllToList().then(res => {
      this.truckService.list = res as Truck[];
    });
  }
  getProvinceToList() {
    this.provinceService.getByActiveToList(true).then(res => {
      this.provinceService.list = res as Province[];
    });
  }
 
  getByQueryString() {
    this.isShowLoading = true;
    this.deliveryService.getByIDString(this.queryString).then(res => {
      this.deliveryService.formData = res as Delivery;
      if (this.deliveryService.formData) {  
        this.getByParentIDToList();           
      }
      this.isShowLoading = false;
    });
  }
  getByParentIDToList() {
    this.isShowLoading = true;
    this.deliveryDetailService.getByParentIDToList(this.deliveryService.formData.ID).then(res => {
      this.deliveryDetailService.list = res as DeliveryDetail[];
      this.dataSource = new MatTableDataSource(this.deliveryDetailService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.deliveryService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.deliveryService.formData = res as Delivery;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.deliveryService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.deliveryByIDToHTML(this.deliveryService.formData.ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}