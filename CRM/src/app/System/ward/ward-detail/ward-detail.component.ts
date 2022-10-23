import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProvinceService } from 'src/app/shared/Province.service';
import { Province } from 'src/app/shared/Province.model';
import { DistrictService } from 'src/app/shared/District.service';
import { District } from 'src/app/shared/District.model';
import { WardService } from 'src/app/shared/Ward.service';
import { Ward } from 'src/app/shared/Ward.model';

@Component({
  selector: 'app-ward-detail',
  templateUrl: './ward-detail.component.html',
  styleUrls: ['./ward-detail.component.css']
})
export class WardDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  provinceID: number = 51;
  districtID: number = 583;
  constructor(
    public provinceService: ProvinceService,
    public districtService: DistrictService,
    public wardService: WardService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<WardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ID = data["ID"] as number;

  }
  ngOnInit(): void {
    this.getProvinceToList();
    this.getDistrictToList();
    this.getWard();
  }
  onClose() {
    this.dialogRef.close();
  }
  getProvinceToList() {
    this.provinceService.getByActiveToList(true).then(res => {
      this.provinceService.list = res as Province[];
    });
  }
  getDistrictToList() {
    this.districtService.getByParentIDToList(this.provinceID).then(res => {
      this.districtService.list = res as District[];
    });
  }
  onChangeProvince($event) {
    this.getDistrictToList();
  }
  getWard() {
    if (this.ID) {    
      this.wardService.getByID(this.ID).then(res => {
        this.wardService.formData001 = res as Ward;
        if (this.wardService.formData001) {
          this.districtService.getByID(this.wardService.formData001.ParentID).then(res => {
            this.districtService.formData = res as District;
            if (this.districtService.formData) {
              this.provinceID = this.districtService.formData.ParentID;
              this.getDistrictToList();
            }
          });
        }
      });
    }    
  }
  onSubmit(form: NgForm) {
    this.wardService.save(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.onClose();
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.onClose();
      }
    );
  }
}