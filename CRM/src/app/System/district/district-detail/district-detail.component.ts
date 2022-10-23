import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProvinceService } from 'src/app/shared/Province.service';
import { Province } from 'src/app/shared/Province.model';
import { DistrictService } from 'src/app/shared/District.service';

@Component({
  selector: 'app-district-detail',
  templateUrl: './district-detail.component.html',
  styleUrls: ['./district-detail.component.css']
})
export class DistrictDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public provinceService: ProvinceService,
    public districtService: DistrictService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<DistrictDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.ID = data["ID"] as number;
  }  
  ngOnInit(): void {
    this.getProvinceToList();
  }
  onClose() {    
    this.dialogRef.close();
  }
  getProvinceToList() {        
    this.provinceService.getByActiveToList(true).then(res => {
      this.provinceService.list = res as Province[];            
    });
  }
  onSubmit(form: NgForm) {    
    this.districtService.save(form.value).subscribe(
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
