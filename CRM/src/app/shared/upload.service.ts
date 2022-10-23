import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  aPIURL: string = environment.APIURL;
  controller: string = "Upload";
  constructor(private httpClient: HttpClient) {
  }
  postProvinceListByExcelFile(fileToUpload: File) {    
    let url = this.aPIURL + this.controller + '/PostProvinceListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  } 
  postProductListByExcelFile(fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostProductListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  } 
  postMembershipListByExcelFile(fileToUpload: File) {    
    let url = this.aPIURL + this.controller + '/PostMembershipListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);    
    return this.httpClient.post(url, formUpload);
  } 
  postCustomerListByExcelFile(fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostCustomerListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  } 
}
