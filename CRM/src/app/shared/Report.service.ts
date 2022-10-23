import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { ProductDataTransfer } from './ProductDataTransfer.model';
@Injectable({
    providedIn: 'root'
})
export class ReportService {   
    listProductDataTransfer: ProductDataTransfer[] | undefined;
    aPIURL: string = environment.APIURL;
    controller: string = "Report";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {        
    }
    theKhoByDateBeginAndDateEndToList(dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/TheKhoByDateBeginAndDateEndToList';
        const params = new HttpParams()            
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
        return this.httpClient.get(url, { params }).toPromise();
    }
    tonKhoThanhPhamByProductIDAndDateBeginAndDateEndToHTML(productID: number,dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/TonKhoThanhPhamByProductIDAndDateBeginAndDateEndToHTML';
        const params = new HttpParams()    
            .set('productID', JSON.stringify(productID))        
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
        return this.httpClient.get(url, { params }).toPromise();
    }
    chiTietBanHangByCustomerIDAndDateBeginAndDateEndToHTML(customerID: number, dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/ChiTietBanHangByCustomerIDAndDateBeginAndDateEndToHTML';
        const params = new HttpParams()
            .set('customerID', JSON.stringify(customerID))
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
        return this.httpClient.get(url, { params }).toPromise();
    }
    congNoDoiChieuByCustomerIDAndDateBeginAndDateEndToHTML(customerID: number, dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/CongNoDoiChieuByCustomerIDAndDateBeginAndDateEndToHTML';
        const params = new HttpParams()
            .set('customerID', JSON.stringify(customerID))
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
        return this.httpClient.get(url, { params }).toPromise();
    }
    congNoPhaiThuByCustomerIDAndDateBeginAndDateEndToHTML(customerID: number, dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/CongNoPhaiThuByCustomerIDAndDateBeginAndDateEndToHTML';
        const params = new HttpParams()
            .set('customerID', JSON.stringify(customerID))
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
        return this.httpClient.get(url, { params }).toPromise();
    }
}

