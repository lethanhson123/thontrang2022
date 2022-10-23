import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WarehouseExportDetail } from 'src/app/shared/WarehouseExportDetail.model';
@Injectable({
    providedIn: 'root'
})
export class WarehouseExportDetailService {
    list: WarehouseExportDetail[] | undefined;
    listShoppingCart: WarehouseExportDetail[] | undefined = [];
    listThonTrang: WarehouseExportDetail[] | undefined;
    listBiBen: WarehouseExportDetail[] | undefined;
    listVyTam: WarehouseExportDetail[] | undefined;
    formData!: WarehouseExportDetail;
    formDataShoppingCart!: WarehouseExportDetail;
    formDataThonTrang!: WarehouseExportDetail;
    formDataBiBen!: WarehouseExportDetail;
    formDataVyTam!: WarehouseExportDetail;
    formDataWarehouseExportDetailSource!: WarehouseExportDetail;
    aPIURL: string = environment.APIURL;
    controller: string = "WarehouseExportDetail";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
        this.formDataShoppingCart = {
        }
        this.formDataThonTrang = {
            ID: 0,
            UnitID: 0
        }
        this.formDataBiBen = {
            ID: 0,
            UnitID: 0
        }
        this.formDataVyTam = {
            ID: 0,
            UnitID: 0
        }
    }
    save(formData: WarehouseExportDetail) {
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
    getByDateBeginAndDateEndToList(dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/GetByDateBeginAndDateEndToList';
        const params = new HttpParams()            
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
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

