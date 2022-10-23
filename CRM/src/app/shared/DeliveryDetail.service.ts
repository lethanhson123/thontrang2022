import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeliveryDetail } from 'src/app/shared/DeliveryDetail.model';
@Injectable({
    providedIn: 'root'
})
export class DeliveryDetailService {
    list: DeliveryDetail[] | undefined;
    formData!: DeliveryDetail;
    aPIURL: string = environment.APIURL;
    controller: string = "DeliveryDetail";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    } 
    getByParentIDToList(parentID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDToList';
        const params = new HttpParams()
        .set('parentID', JSON.stringify(parentID))
        return this.httpClient.get(url, { params }).toPromise();
    }    
}

