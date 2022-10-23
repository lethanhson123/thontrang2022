import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { NotificationService } from 'src/app/shared/notification.service';


@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  URLSub: string = "CompanyInfo";
  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public companyService: CompanyService,    
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
    this.companyService.getByIDString(this.queryString).then(res => {
      this.companyService.formData = res as Company;         
      this.isShowLoading = false;
    });
  }
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.companyService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.companyService.formData = res as Company;
        window.location.href = environment.DomainDestination + this.URLSub + "/" + this.companyService.formData.ID;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
}
