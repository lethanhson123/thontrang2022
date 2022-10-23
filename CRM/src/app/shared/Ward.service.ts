import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ward } from 'src/app/shared/Ward.model';
@Injectable({
    providedIn: 'root'
})
export class WardService {
    list: Ward[] | undefined;
    formData!: Ward;
    formData001!: Ward;
    aPIURL: string = environment.APIURL;
    controller: string = "Ward";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
        this.formData001 = {
        }
    }  
    
    save(formData: Ward) {
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
    getByParentIDToList(parentID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDToList';
        const params = new HttpParams()
        .set('parentID', JSON.stringify(parentID))
        return this.httpClient.get(url, { params }).toPromise();
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
}

