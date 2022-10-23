import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MembershipAuthenticationToken } from 'src/app/shared/MembershipAuthenticationToken.model';
@Injectable({
    providedIn: 'root'
})
export class MembershipAuthenticationTokenService {
    list: MembershipAuthenticationToken[] | undefined;
    listParent: MembershipAuthenticationToken[] | undefined = [];
    listChild: MembershipAuthenticationToken[] | undefined = [];
    formData!: MembershipAuthenticationToken;
    aPIURL: string = environment.APIURL;
    controller: string = "MembershipAuthenticationToken";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }
    save(formData: MembershipAuthenticationToken) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    
    getByAuthenticationToken(authenticationToken: string) {
        let url = this.aPIURL + this.controller + '/GetByAuthenticationToken';
        const params = new HttpParams()
            .set('authenticationToken', authenticationToken)
        return this.httpClient.get(url, { params }).toPromise();
    }
    
}

