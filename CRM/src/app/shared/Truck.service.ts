import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Truck } from 'src/app/shared/Truck.model';
@Injectable({
    providedIn: 'root'
})
export class TruckService {
    list: Truck[] | undefined;
    formData!: Truck;
    aPIURL: string = environment.APIURL;
    controller: string = "Truck";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }  
    
    save(formData: Truck) {
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
}

