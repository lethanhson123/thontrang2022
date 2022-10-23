import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProvinceService } from 'src/app/shared/Province.service';

@Component({
  selector: 'app-province-detail',
  templateUrl: './province-detail.component.html',
  styleUrls: ['./province-detail.component.css']
})
export class ProvinceDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public provinceService: ProvinceService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProvinceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.ID = data["ID"] as number;
  }  
  ngOnInit(): void {
  }
  onClose() {    
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {    
    this.provinceService.save(form.value).subscribe(
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
