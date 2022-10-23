import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { MembershipSystemMenu } from 'src/app/shared/MembershipSystemMenu.model';
import { MembershipSystemMenuService } from 'src/app/shared/MembershipSystemMenu.service';
import { MembershipAccessHistory } from 'src/app/shared/MembershipAccessHistory.model';
import { MembershipAccessHistoryService } from 'src/app/shared/MembershipAccessHistory.service';
import { MembershipAuthenticationToken } from 'src/app/shared/MembershipAuthenticationToken.model';
import { MembershipAuthenticationTokenService } from 'src/app/shared/MembershipAuthenticationToken.service';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { OrderDetailService } from 'src/app/shared/OrderDetail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRM';
  domainName = environment.DomainDestination;
  queryString: string = environment.InitializationString;
  constructor(
    public router: Router,
    public orderDetailService: OrderDetailService,
    public membershipSystemMenuService: MembershipSystemMenuService,
    public membershipAccessHistoryService: MembershipAccessHistoryService,
    public membershipAuthenticationTokenService: MembershipAuthenticationTokenService,
    public membershipService: MembershipService,
  ) {    
    this.getByQueryString();
  }
  getByQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        if (this.queryString.indexOf(environment.AuthenticationToken) > -1) {
          localStorage.setItem(environment.AuthenticationToken, this.queryString.split('=')[this.queryString.split('=').length - 1]);
        }
        this.checkAuthenticationToken();
      }
    });
  }
  checkAuthenticationToken() {
    let destinationURL = environment.DomainDestination + "Login?url=" + environment.DomainDestination;
    let authenticationToken = localStorage.getItem(environment.AuthenticationToken);
    if (authenticationToken == null) {
      window.location.href = destinationURL;
    }
    else {
      this.membershipAuthenticationTokenService.getByAuthenticationToken(authenticationToken).then(res => {
        let membershipAuthenticationToken = res as MembershipAuthenticationToken;
        if (membershipAuthenticationToken != null) {
          if (membershipAuthenticationToken.ParentID > 0) {
            this.membershipService.getByID(membershipAuthenticationToken.ParentID).then(res => {
              this.membershipService.formDataLogin = res as Membership;
              if (this.membershipService.formDataLogin) {
                this.getMembershipSystemMenuToList();
                localStorage.setItem(environment.MembershipID, this.membershipService.formDataLogin.ID.toString());
                localStorage.setItem("MembershipAccount", this.membershipService.formDataLogin.Account);
                localStorage.setItem("MembershipName", this.membershipService.formDataLogin.Name);
                this.saveAccess(this.queryString);
              }
            });
          }
          else {
            window.location.href = destinationURL;
          }
        }
      });
    }
  }
  getMembershipSystemMenuToList() {    
    this.membershipSystemMenuService.getByParentIDAndActiveToList(this.membershipService.formDataLogin.ID, true).then(res => {
      this.membershipSystemMenuService.listChild = res as MembershipSystemMenu[];
      this.membershipSystemMenuService.listParent = [];
      for (var i = 0; i < this.membershipSystemMenuService.listChild.length; i++) {
        if (this.membershipSystemMenuService.listChild[i].SystemMenuParentID == 0) {
          this.membershipSystemMenuService.listParent.push(this.membershipSystemMenuService.listChild[i]);
        }
      }      
    });
  }
  saveAccess(url: string) {
    url = environment.DomainURL + "#" + url;
    this.membershipAccessHistoryService.formData.URL = url;
    this.membershipAccessHistoryService.formData.UserNameAccess = this.membershipService.formDataLogin.Name;
    this.membershipAccessHistoryService.formData.UserIDAccess = this.membershipService.formDataLogin.ID;
    this.membershipAccessHistoryService.save(this.membershipAccessHistoryService.formData).subscribe(
      res => {
      },
      err => {
      }
    );
  }
  onLogout() {
    this.membershipService.getByID(0).then(res => {
      this.membershipService.formDataLogin = res as Membership;
      if (this.membershipService.formDataLogin) {
        this.getMembershipSystemMenuToList();
        localStorage.setItem(environment.AuthenticationToken, environment.InitializationString);
        localStorage.setItem(environment.MembershipID, environment.InitializationString);
        localStorage.setItem("MembershipAccount", environment.InitializationString);
        localStorage.setItem("MembershipName", environment.InitializationString);
        let destinationURL = environment.DomainDestination + "Login?url=" + environment.DomainDestination;
        window.location.href = destinationURL;
      }
    });

  }
}
