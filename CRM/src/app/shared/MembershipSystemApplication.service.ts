import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MembershipSystemApplication } from 'src/app/shared/MembershipSystemApplication.model';
@Injectable({
    providedIn: 'root'
})
export class MembershipSystemApplicationService {
    list: MembershipSystemApplication[] | undefined;
    formData!: MembershipSystemApplication;
    aPIURL: string = environment.APIURL;
    controller: string = "MembershipSystemApplication";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }  
    
    save(formData: MembershipSystemApplication) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }    
    getByID(ID: number) {
        let url = this.aPIURL + this.controller + '/GetByID';
        const params = new HttpParams()
        .set('ID', JSON.stringify(ID))
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByParentIDToList(parentID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDToList';
        const params = new HttpParams()
        .set('parentID', JSON.stringify(parentID))
        return this.httpClient.get(url, { params }).toPromise();
    }   
}

