import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Delivery } from 'src/app/shared/Delivery.model';
@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    list: Delivery[] | undefined;
    formData!: Delivery;
    aPIURL: string = environment.APIURL;
    controller: string = "Delivery";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }  
    
    save(formData: Delivery) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    getByDateBeginAndDateEndToList(dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/GetByDateBeginAndDateEndToList';
        const params = new HttpParams()
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)            
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
}

