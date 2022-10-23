import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseCancel } from 'src/app/shared/WarehouseCancel.model';

@Injectable({
    providedIn: 'root'
})
export class WarehouseCancelService {
    list: WarehouseCancel[] | undefined;
    formData!: WarehouseCancel;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseCancel";
    WarehouseCancelCustomerID: number = 0;
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }

    save(formData: WarehouseCancel) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }    
    getByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(active: boolean, companyID: number, year: number, month: number, searchString: string) {
        let url = this.aPIURL + this.controller + '/GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList';
        const params = new HttpParams()
            .set('active', JSON.stringify(active))
            .set('companyID', JSON.stringify(companyID))
            .set('year', JSON.stringify(year))
            .set('month', JSON.stringify(month))
            .set('searchString', searchString)
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

