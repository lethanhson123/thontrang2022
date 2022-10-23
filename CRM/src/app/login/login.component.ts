import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account: string = environment.InitializationString;
  password: string = environment.InitializationString;  
  constructor(
    public membershipService: MembershipService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }
  onLogin() {    
    this.membershipService.authenticationByAccountAndPasswordAndURL(this.account, this.password, environment.DomainDestination).then(
      data => {
        this.membershipService.formDataLogin = data as Membership;        
        if (this.membershipService.formDataLogin.ID > 0) {
          window.location.href = this.membershipService.formDataLogin.Description;
        }
        else {          
          this.notificationService.warn(environment.LoginNotSuccess);
        }
      },
      err => {        
        this.notificationService.warn(environment.LoginNotSuccess);
      }
    );
  }
}
