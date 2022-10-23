import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { Unit } from 'src/app/shared/Unit.model';
import { UnitService } from 'src/app/shared/Unit.service';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { ProductCategory } from 'src/app/shared/ProductCategory.model';
import { ProductCategoryService } from 'src/app/shared/ProductCategory.service';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "ProductInfo";
  fileToUpload: any;
  fileToUpload0: File = null;
  isAttachments: boolean = false;
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public productService: ProductService,
    public unitService: UnitService,
    public companyService: CompanyService,
    public productCategoryService: ProductCategoryService,
  ) {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getUnitToList();
        this.getCompanyToList();
        this.getProductCategoryToList();
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getUnitToList() {
    this.unitService.getAllToList().then(res => {
      this.unitService.list = res as Unit[];
    });
  }
  getCompanyToList() {
    this.companyService.getAllToList().then(res => {
      this.companyService.list = res as Company[];
    });
  }
  getProductCategoryToList() {
    this.productCategoryService.getAllToList().then(res => {
      this.productCategoryService.list = res as ProductCategory[];
    });
  }
  getByQueryString() {
    this.isShowLoading = true;
    this.productService.getByIDString(this.queryString).then(res => {
      this.productService.formData = res as Product;
      this.isShowLoading = false;
    });
  }
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.productService.saveAndUploadFiles(form.value, this.fileToUpload, this.isAttachments).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.productService.formData = res as Product;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.productService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
  changeImage(files: FileList) {
    if (files) {
      this.fileToUpload = files;
      this.fileToUpload0 = files.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.productService.formData.ImageURL = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload0);
    }
  }
}
