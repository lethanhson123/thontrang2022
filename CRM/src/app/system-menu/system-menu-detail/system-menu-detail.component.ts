import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { SystemMenuService } from 'src/app/shared/SystemMenu.service';

@Component({
  selector: 'app-system-menu-detail',
  templateUrl: './system-menu-detail.component.html',
  styleUrls: ['./system-menu-detail.component.css']
})
export class SystemMenuDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public systemMenuService: SystemMenuService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<SystemMenuDetailComponent>,
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
    this.systemMenuService.save(form.value).subscribe(
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