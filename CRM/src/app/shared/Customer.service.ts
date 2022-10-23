import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/shared/Customer.model';
@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    list: Customer[] | undefined;
    formData!: Customer;
    aPIURL: string = environment.APIURL;
    controller: string = "Customer";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }  
    
    save(formData: Customer) {
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
    getByParentIDAndProvinceIDToList(parentID: number, provinceID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDAndProvinceIDToList';
        const params = new HttpParams()
        .set('parentID', JSON.stringify(parentID))
        .set('provinceID', JSON.stringify(provinceID))
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
    getAll001ToList() {
        let url = this.aPIURL + this.controller + '/GetAll001ToList';
        return this.httpClient.get(url).toPromise();
    }
}

