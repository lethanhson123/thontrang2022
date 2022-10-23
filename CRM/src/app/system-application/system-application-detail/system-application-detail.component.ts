import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { SystemApplicationService } from 'src/app/shared/SystemApplication.service';

@Component({
  selector: 'app-system-application-detail',
  templateUrl: './system-application-detail.component.html',
  styleUrls: ['./system-application-detail.component.css']
})
export class SystemApplicationDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public systemApplicationService: SystemApplicationService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SystemApplicationDetailComponent>,
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
    this.systemApplicationService.save(form.value).subscribe(
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
