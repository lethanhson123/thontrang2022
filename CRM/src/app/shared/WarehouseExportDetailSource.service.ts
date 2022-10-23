import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseExportDetailSource } from 'src/app/shared/WarehouseExportDetailSource.model';
@Injectable({
    providedIn: 'root'
})
export class WarehouseExportDetailSourceService {
    list: WarehouseExportDetailSource[] | undefined;   
    formData!: WarehouseExportDetailSource;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseExportDetailSource";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }
    save(formData: WarehouseExportDetailSource) {
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
}

