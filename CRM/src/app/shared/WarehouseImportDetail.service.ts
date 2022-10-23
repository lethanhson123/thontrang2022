import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseImportDetail } from 'src/app/shared/WarehouseImportDetail.model';
@Injectable({
    providedIn: 'root'
})
export class WarehouseImportDetailService {
    list: WarehouseImportDetail[] | undefined;
    listWarehouseExportDetailSource: WarehouseImportDetail[] | undefined;
    listShoppingCart: WarehouseImportDetail[] | undefined = [];
    formData!: WarehouseImportDetail;
    formDataShoppingCart!: WarehouseImportDetail;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseImportDetail";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
        this.formDataShoppingCart = {            
        }
    }
    save(formData: WarehouseImportDetail) {
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

