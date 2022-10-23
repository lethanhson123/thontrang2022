import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/Product.model';
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    list: Product[] | undefined;
    listThonTrang: Product[] | undefined;
    listBiBen: Product[] | undefined;
    listVyTam: Product[] | undefined;
    formData!: Product;
    aPIURL: string = environment.APIURL;
    controller: string = "Product";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }
    saveAndUploadFiles(formData: Product, fileToUpload: FileList, isAttachments: boolean) {        
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/SaveAndUploadFiles';
        const uploadData = JSON.stringify(formData);
        const isAttachmentsData = JSON.stringify(isAttachments);
        const formUpload: FormData = new FormData();
        formUpload.append('data', uploadData);
        formUpload.append('isAttachments', isAttachmentsData);       
        if (fileToUpload) {
            if (fileToUpload.length > 0) {
                for (var i = 0; i < fileToUpload.length; i++) {
                    formUpload.append('file[]', fileToUpload[i]);
                }
            }
        }
        return this.httpClient.post(url, formUpload);
    }    
    getAllToList() {
        let url = this.aPIURL + this.controller + '/GetAllToList';
        return this.httpClient.get(url).toPromise();
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
    getBySearchStringToList(searchString: string) {
        let url = this.aPIURL + this.controller + '/GetBySearchStringToList';
        const params = new HttpParams()
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByCompanyIDAndSearchStringToList(companyID: number, searchString: string) {
        let url = this.aPIURL + this.controller + '/GetByCompanyIDAndSearchStringToList';
        const params = new HttpParams()
            .set('companyID', JSON.stringify(companyID))
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByDateBeginAndDateEndAndSearchStringToList(dateBegin: any, dateEnd: any, searchString: string) {
        let url = this.aPIURL + this.controller + '/GetByDateBeginAndDateEndAndSearchStringToList';
        const params = new HttpParams()
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
}

