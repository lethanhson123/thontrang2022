import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { MembershipCategoryService } from 'src/app/shared/MembershipCategory.service';

@Component({
  selector: 'app-membership-category-detail',
  templateUrl: './membership-category-detail.component.html',
  styleUrls: ['./membership-category-detail.component.css']
})
export class MembershipCategoryDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public membershipCategoryService: MembershipCategoryService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<MembershipCategoryDetailComponent>,
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
    this.membershipCategoryService.save(form.value).subscribe(
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