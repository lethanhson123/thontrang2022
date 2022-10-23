import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseExportPayment } from 'src/app/shared/WarehouseExportPayment.model';

@Injectable({
    providedIn: 'root'
})
export class WarehouseExportPaymentService {
    list: WarehouseExportPayment[] | undefined;
    formData!: WarehouseExportPayment;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseExportPayment";
    WarehouseExportPaymentCustomerID: number = 0;
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
            DatePay: new Date(),
            TotalPay: 0
        }
    }

    save(formData: WarehouseExportPayment) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    remove(ID) {
        var userUpdated: number = 0;
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            userUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Remove';
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

