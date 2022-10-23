import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { YearMonth } from 'src/app/shared/YearMonth.model';
@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    listYear: YearMonth[] | undefined;
    listMonth: YearMonth[] | undefined;
    formData!: YearMonth;
    aPIURL: string = environment.APIURL;
    controller: string = "Download";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }

    getYearToList() {
        let url = this.aPIURL + this.controller + '/GetYearToList';
        return this.httpClient.get(url).toPromise();
    }
    getMonthToList() {
        let url = this.aPIURL + this.controller + '/GetMonthToList';
        return this.httpClient.get(url).toPromise();
    }
    orderByIDToHTML(orderID: number) {
        let url = this.aPIURL + this.controller + '/OrderByIDToHTML';
        const params = new HttpParams()
            .set('orderID', JSON.stringify(orderID))
        return this.httpClient.get(url, { params }).toPromise();
    }
    deliveryByIDToHTML(deliveryID: number) {
        let url = this.aPIURL + this.controller + '/DeliveryByIDToHTML';
        const params = new HttpParams()
            .set('deliveryID', JSON.stringify(deliveryID))
        return this.httpClient.get(url, { params }).toPromise();
    }
    warehouseExportDetailByDateBeginAndDateEndToHTML(dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/WarehouseExportDetailByDateBeginAndDateEndToHTML';
        const params = new HttpParams()            
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
        return this.httpClient.get(url, { params }).toPromise();
    }   
}

