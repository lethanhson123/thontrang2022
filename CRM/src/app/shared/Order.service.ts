import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/Order.model';
import { OrderDetail } from 'src/app/shared/OrderDetail.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    list: Order[] | undefined;
    formData!: Order;
    aPIURL: string = environment.APIURL;
    controller: string = "Order";
    orderCustomerID: number = 0;
    constructor(private httpClient: HttpClient) {
        this.initializationFormData();
    }
    initializationFormData() {
        this.formData = {
        }
    }

    save(formData: Order) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            formData.UserUpdated = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/Save';
        return this.httpClient.post(url, formData);
    }
    saveShoppingCart(listOrderDetail: OrderDetail[], customerID: number, orderID: number) {
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            let url = this.aPIURL + this.controller + '/SaveShoppingCart';
            const formUpload: FormData = new FormData();
            formUpload.append('listOrderDetail', JSON.stringify(listOrderDetail));
            formUpload.append('customerID', JSON.stringify(customerID));
            formUpload.append('orderID', JSON.stringify(orderID));
            formUpload.append('userUpdated', JSON.stringify(membershipID));
            return this.httpClient.post(url, formUpload);
        }
    }
    getByActiveAndStatusIDAndYearAndMonthAndSearchStringToList(active: boolean, statusID: number, year: number, month: number, searchString: string) {
        let url = this.aPIURL + this.controller + '/GetByActiveAndStatusIDAndYearAndMonthAndSearchStringToList';
        const params = new HttpParams()
            .set('active', JSON.stringify(active))
            .set('statusID', JSON.stringify(statusID))
            .set('year', JSON.stringify(year))
            .set('month', JSON.stringify(month))
            .set('searchString', searchString)
        return this.httpClient.get(url, { params }).toPromise();
    }
    getByActiveAndStatusIDAndUserFoundedIDAndSearchStringToList(active: boolean, statusID: number, searchString: string) {
        var userFoundedID = 0;
        var membershipID = localStorage.getItem("MembershipID");
        if (membershipID) {
            userFoundedID = Number(membershipID);
        }
        let url = this.aPIURL + this.controller + '/GetByActiveAndStatusIDAndUserFoundedIDAndSearchStringToList';
        const params = new HttpParams()
            .set('active', JSON.stringify(active))
            .set('statusID', JSON.stringify(statusID))
            .set('userFoundedID', JSON.stringify(userFoundedID))
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

}

