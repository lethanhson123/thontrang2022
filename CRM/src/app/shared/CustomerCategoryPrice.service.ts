import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerCategoryPrice } from 'src/app/shared/CustomerCategoryPrice.model';
@Injectable({
    providedIn: 'root'
})
export class CustomerCategoryPriceService {
    list: CustomerCategoryPrice[] | undefined;
    formData!: CustomerCategoryPrice;
    aPIURL: string = environment.APIURL;
    controller: string = "CustomerCategoryPrice";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }  
    
    save(formData: CustomerCategoryPrice) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }        
    getByParentIDAndSearchStringToList(parentID: number, searchString: string) {
        let url = this.aPIURL + this.controller + '/GetByParentIDAndSearchStringToList';
        const params = new HttpParams()            
            .set('parentID', JSON.stringify(parentID))
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
}

