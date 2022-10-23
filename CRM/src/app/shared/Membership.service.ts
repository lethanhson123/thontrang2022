import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Membership } from 'src/app/shared/Membership.model';
@Injectable({
    providedIn: 'root'
})
export class MembershipService {
    list: Membership[] | undefined;
    formData!: Membership;
    formDataLogin!: Membership;
    isLogin: boolean = false;
    aPIURL: string = environment.APIURL;
    controller: string = "Membership";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }

    save(formData: Membership) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    getAllToList() {
        let url = this.aPIURL + this.controller + '/GetAllToList';
        return this.httpClient.get(url).toPromise();
    }
    getByID(ID: number) {
        let url = this.aPIURL + this.controller + '/GetByID';
        const params = new HttpParams()
            .set('ID', JSON.stringify(ID))
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByIDString(ID: string) {
        let url = this.aPIURL + this.controller + '/GetByIDString';
        const params = new HttpParams()
            .set('ID', ID)
        return this.httpClient.get(url, { params }).toPromise();
    }
    getBySearchStringToList(searchString: string) {
        let url = this.aPIURL + this.controller + '/GetBySearchStringToList';
        const params = new HttpParams()
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
    authenticationByAccountAndPasswordAndURL(account: string, password: string, urlDestination: string) {
        let url = this.aPIURL + this.controller + '/AuthenticationByAccountAndPasswordAndURL';
        const params = new HttpParams()
            .set('account', account)
            .set('password', password)
            .set('urlDestination', urlDestination)
        return this.httpClient.get(url, { params }).toPromise();
    }
}

