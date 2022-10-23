import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseReturnDetail } from 'src/app/shared/WarehouseReturnDetail.model';
@Injectable({
    providedIn: 'root'
})
export class WarehouseReturnDetailService {
    list: WarehouseReturnDetail[] | undefined;
    listShoppingCart: WarehouseReturnDetail[] | undefined = [];
    formData!: WarehouseReturnDetail;
    formDataShoppingCart!: WarehouseReturnDetail;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseReturnDetail";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
        this.formDataShoppingCart = {            
        }
    }
    save(formData: WarehouseReturnDetail) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    getByParentIDToList(parentID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDToList';
        const params = new HttpParams()
        .set('parentID', JSON.stringify(parentID))        
        return this.httpClient.get(url, { params }).toPromise();
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
}

