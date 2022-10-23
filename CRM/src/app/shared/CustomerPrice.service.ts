import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerPrice } from 'src/app/shared/CustomerPrice.model';
@Injectable({
    providedIn: 'root'
})
export class CustomerPriceService {
    list: CustomerPrice[] | undefined;
    formData!: CustomerPrice;
    aPIURL: string = environment.APIURL;
    controller: string = "CustomerPrice";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }     
    save(formData: CustomerPrice) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    saveItems(listCustomerPrice: CustomerPrice[]) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            let url = this.aPIURL + this.controller + '/SaveItems';
            const formUpload: FormData = new FormData();
            formUpload.append('listCustomerPrice', JSON.stringify(listCustomerPrice));           
            formUpload.append('userUpdated', JSON.stringify(membershipID));
            return this.httpClient.post(url, formUpload);
        }
    }    
    getByParentIDToList(parentID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDToList';
        const params = new HttpParams()
            .set('parentID', JSON.stringify(parentID))            
        return this.httpClient.get(url, { params }).toPromise();
    }   
    getByParentIDAndIsWishlistToList(parentID: number, isWishlist: boolean) {
        let url = this.aPIURL + this.controller + '/GetByParentIDAndIsWishlistToList';
        const params = new HttpParams()
            .set('parentID', JSON.stringify(parentID))            
            .set('isWishlist', JSON.stringify(isWishlist))
        return this.httpClient.get(url, { params }).toPromise();
    }   
    getByParentIDAndSearchStringAndIsWishlistToList(parentID: number, searchString: string, isWishlist: boolean) {
        let url = this.aPIURL + this.controller + '/GetByParentIDAndSearchStringAndIsWishlistToList';
        const params = new HttpParams()
            .set('parentID', JSON.stringify(parentID))            
            .set('searchString', searchString)
            .set('isWishlist', JSON.stringify(isWishlist))
        return this.httpClient.get(url, { params }).toPromise();
    }  
   
}

