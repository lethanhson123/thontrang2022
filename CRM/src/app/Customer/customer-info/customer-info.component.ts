import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { CustomerCategory } from 'src/app/shared/CustomerCategory.model';
import { CustomerCategoryService } from 'src/app/shared/CustomerCategory.service';
import { Province } from 'src/app/shared/Province.model';
import { ProvinceService } from 'src/app/shared/Province.service';
import { District } from 'src/app/shared/District.model';
import { DistrictService } from 'src/app/shared/District.service';
import { Ward } from 'src/app/shared/Ward.model';
import { WardService } from 'src/app/shared/Ward.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "CustomerInfo";
  provinceID: number = 51;
  districtID: number = 583;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public provinceService: ProvinceService,
    public districtService: DistrictService,
    public wardService: WardService,
    public customerService: CustomerService,
    public customerCategoryService: CustomerCategoryService,

  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getCustomerCategoryToList();
        this.getProvinceToList();
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getCustomerCategoryToList() {
    this.customerCategoryService.getAllToList().then(res => {
      this.customerCategoryService.list = res as CustomerCategory[];
    });
  }
  getProvinceToList() {
    this.provinceService.getByActiveToList(true).then(res => {
      this.provinceService.list = res as Province[];
    });
  }
  getDistrictToList() {
    this.districtService.getByParentIDToList(this.customerService.formData.ProvinceID).then(res => {
      this.districtService.list = res as District[];
      if (this.districtService.list) {
        if (this.districtService.list.length > 0) {
          this.customerService.formData.DistrictID = this.districtService.list[0].ID;
          this.getWardToList();
        }
      }
    });
  }
  getWardToList() {
    this.wardService.getByParentIDToList(this.customerService.formData.DistrictID).then(res => {
      this.wardService.list = res as Ward[];
      if (this.wardService.list) {
        if (this.wardService.list.length > 0) {
          this.customerService.formData.WardID = this.wardService.list[0].ID;
        }
      }
    });
  }
  getByQueryString() {
    this.isShowLoading = true;
    this.customerService.getByIDString(this.queryString).then(res => {
      this.customerService.formData = res as Customer;
      if (this.customerService.formData) {
        this.getDistrictToList();        
      }
      this.isShowLoading = false;
    });
  }
  onChangeProvince($event) {
    this.getDistrictToList();
  }
  onChangeDistrict($event) {
    this.getWardToList();
  }
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.customerService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.customerService.formData = res as Customer;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.customerService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
}
