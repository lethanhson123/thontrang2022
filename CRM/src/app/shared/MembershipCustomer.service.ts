import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MembershipCustomer } from 'src/app/shared/MembershipCustomer.model';
@Injectable({
    providedIn: 'root'
})
export class MembershipCustomerService {
    list: MembershipCustomer[] | undefined;
    formData!: MembershipCustomer;
    aPIURL: string = environment.APIURL;
    controller: string = "MembershipCustomer";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }
    saveItems(listMembershipCustomer: MembershipCustomer[]) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            let url = this.aPIURL + this.controller + '/SaveItems';
            const formUpload: FormData = new FormData();
            formUpload.append('listMembershipCustomer', JSON.stringify(listMembershipCustomer));
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
    getByParentIDAndActiveAndSearchStringToList(parentID: number, active: boolean,searchString: string) {
        let url = this.aPIURL + this.controller + '/GetByParentIDAndActiveAndSearchStringToList';
        const params = new HttpParams()
            .set('parentID', JSON.stringify(parentID))
            .set('active', JSON.stringify(active))
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
}

