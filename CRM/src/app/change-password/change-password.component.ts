import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isShowLoading: boolean = false;
  queryString: string = environment.InitializationString;
  constructor(
    public notificationService: NotificationService,
    public membershipService: MembershipService,
  ) {
    this.getByQueryString();
  }

  ngOnInit(): void {
  }
  getByQueryString() {
    this.isShowLoading = true;
    this.membershipService.getByID(this.notificationService.membershipID).then(res => {
      this.membershipService.formData = res as Membership;
      this.isShowLoading = false;
    });
  }
  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.membershipService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;
        this.membershipService.formData = res as Membership;
        this.notificationService.warn(environment.SaveSuccess);
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
}
