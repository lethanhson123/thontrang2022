import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MembershipAccessHistory } from 'src/app/shared/MembershipAccessHistory.model';
@Injectable({
    providedIn: 'root'
})
export class MembershipAccessHistoryService {
    list: MembershipAccessHistory[] | undefined;
    listParent: MembershipAccessHistory[] | undefined = [];
    listChild: MembershipAccessHistory[] | undefined = [];
    formData!: MembershipAccessHistory;
    aPIURL: string = environment.APIURL;
    controller: string = "MembershipAccessHistory";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }
    save(formData: MembershipAccessHistory) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    getByDateBeginAndDateEndToList(dateBegin: any, dateEnd: any) {
        let url = this.aPIURL + this.controller + '/GetByDateBeginAndDateEndToList';
        const params = new HttpParams()
            .set('dateBegin', dateBegin)
            .set('dateEnd', dateEnd)            
        return this.httpClient.get(url, { params }).toPromise();
    }
}

