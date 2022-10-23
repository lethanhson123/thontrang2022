import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MembershipSystemMenu } from 'src/app/shared/MembershipSystemMenu.model';
@Injectable({
    providedIn: 'root'
})
export class MembershipSystemMenuService {
    list: MembershipSystemMenu[] | undefined;
    listParent: MembershipSystemMenu[] | undefined = [];
    listChild: MembershipSystemMenu[] | undefined = [];
    formData!: MembershipSystemMenu;
    aPIURL: string = environment.APIURL;
    controller: string = "MembershipSystemMenu";
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }

    saveItems(listMembershipSystemMenu: MembershipSystemMenu[]) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            let url = this.aPIURL + this.controller + '/SaveItems';
            const formUpload: FormData = new FormData();
            formUpload.append('listMembershipSystemMenu', JSON.stringify(listMembershipSystemMenu));
            formUpload.append('userUpdated', JSON.stringify(membershipID));
            return this.httpClient.post(url, formUpload);
        }
    }
    getByID(ID: number) {
        let url = this.aPIURL + this.controller + '/GetByID';
        const params = new HttpParams()
            .set('ID', JSON.stringify(ID))
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByParentIDToList(parentID: number) {
        let url = this.aPIURL + this.controller + '/GetByParentIDToList';
        const params = new HttpParams()
            .set('parentID', JSON.stringify(parentID))
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByParentIDAndActiveToList(parentID: number, active: boolean) {
        let url = this.aPIURL + this.controller + '/GetByParentIDAndActiveToList';
        const params = new HttpParams()
            .set('parentID', JSON.stringify(parentID))
            .set('active', JSON.stringify(active))
        return this.httpClient.get(url, { params }).toPromise();
    }
}

