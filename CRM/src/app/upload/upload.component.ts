import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/shared/upload.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  isShowLoading: boolean = false;
  excelTemplateURLProduct: string = environment.APIURL + environment.Download + "/Product.xlsx";
  excelTemplateURLProvince: string = environment.APIURL + environment.Download + "/Province.xlsx";
  excelTemplateURLCustomer: string = environment.APIURL + environment.Download + "/Customer.xlsx";
  excelTemplateURLMembership: string = environment.APIURL + environment.Download + "/Membership.xlsx";
  @ViewChild('uploadItemProduct') uploadItemProduct!: ElementRef;
  @ViewChild('uploadItemProvince') uploadItemProvince!: ElementRef;
  @ViewChild('uploadItemCustomer') uploadItemCustomer!: ElementRef;
  @ViewChild('uploadItemMembership') uploadItemMembership!: ElementRef;
  constructor(
    public uploadService: UploadService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }
  onSubmitProduct() {
    if (this.uploadItemProduct) {
      if (this.uploadItemProduct.nativeElement.files[0]) {
        let fileToUpload: File;
        fileToUpload = this.uploadItemProduct.nativeElement.files[0];
        console.log(fileToUpload);
        this.isShowLoading = true;
        this.uploadService.postProductListByExcelFile(fileToUpload).subscribe(
          data => {
            this.notificationService.success(environment.UploadSuccess);
            this.isShowLoading = false;
          },
          err => {
            this.notificationService.warn(environment.UploadNotSuccess);
            this.isShowLoading = false;
          }
        );
      }
      else {
      }
    }
    else {
    }
  }
  onSubmitProvince() {
    if (this.uploadItemProvince) {
      if (this.uploadItemProvince.nativeElement.files[0]) {
        let fileToUpload: File;
        fileToUpload = this.uploadItemProvince.nativeElement.files[0];
        this.isShowLoading = true;
        this.uploadService.postProvinceListByExcelFile(fileToUpload).subscribe(
          data => {
            this.notificationService.success(environment.UploadSuccess);
            this.isShowLoading = false;
          },
          err => {
            this.notificationService.warn(environment.UploadNotSuccess);
            this.isShowLoading = false;
          }
        );
      }
      else {
      }
    }
    else {
    }
  }
  onSubmitMembership() {
    if (this.uploadItemMembership) {
      if (this.uploadItemMembership.nativeElement.files[0]) {
        let fileToUpload: File;
        fileToUpload = this.uploadItemMembership.nativeElement.files[0];        
        this.isShowLoading = true;
        this.uploadService.postMembershipListByExcelFile(fileToUpload).subscribe(
          data => {
            this.notificationService.success(environment.UploadSuccess);
            this.isShowLoading = false;
          },
          err => {
            this.notificationService.warn(environment.UploadNotSuccess);
            this.isShowLoading = false;
          }
        );
      }
      else {
      }
    }
    else {
    }
  }
  onSubmitCustomer() {
    if (this.uploadItemCustomer) {
      if (this.uploadItemCustomer.nativeElement.files[0]) {
        let fileToUpload: File;
        fileToUpload = this.uploadItemCustomer.nativeElement.files[0];
        this.isShowLoading = true;
        this.uploadService.postCustomerListByExcelFile(fileToUpload).subscribe(
          data => {
            this.notificationService.success(environment.UploadSuccess);
            this.isShowLoading = false;
          },
          err => {
            this.notificationService.warn(environment.UploadNotSuccess);
            this.isShowLoading = false;
          }
        );
      }
      else {
      }
    }
    else {
    }
  }
}
