import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseExport } from 'src/app/shared/WarehouseExport.model';

@Injectable({
    providedIn: 'root'
})
export class WarehouseExportService {
    list: WarehouseExport[] | undefined;
    formData!: WarehouseExport;
    formDataThonTrang!: WarehouseExport;
    formDataBiBen!: WarehouseExport;
    formDataVyTam!: WarehouseExport;
    ID: number;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseExport";
    WarehouseExportCustomerID: number = 0;    
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
        this.formDataThonTrang = {
            ID: 0            
        }
        this.formDataBiBen = {
            ID: 0            
        }
        this.formDataVyTam = {
            ID: 0            
        }
    }

    save(formData: WarehouseExport) {
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
    covertOrderToWarehouseExportByOrderIDAndUserUpdated(ID: string) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            let url = this.aPIURL + this.controller + '/CovertOrderToWarehouseExportByOrderIDAndUserUpdated';
            const params = new HttpParams()
                .set('ID', ID)
                .set('userUpdated', JSON.stringify(Number(membershipID)))
            return this.httpClient.get(url, { params }).toPromise();
        }
    }
    getByActiveAndCompanyIDAndParentID(active: boolean, companyID: number, ID: string) {
        let url = this.aPIURL + this.controller + '/GetByActiveAndCompanyIDAndParentID';
        const params = new HttpParams()
            .set('active', JSON.stringify(active))
            .set('companyID', JSON.stringify(companyID))
            .set('ID', ID)
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByActiveAndCustomerIDToList(active: boolean, customerID: number) {
        let url = this.aPIURL + this.controller + '/GetByActiveAndCustomerIDToList';
        const params = new HttpParams()
            .set('active', JSON.stringify(active))
            .set('customerID', JSON.stringify(customerID))            
        return this.httpClient.get(url, { params }).toPromise();
    }
}

