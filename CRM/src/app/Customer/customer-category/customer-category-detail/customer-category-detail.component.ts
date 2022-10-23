import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { CustomerCategoryService } from 'src/app/shared/CustomerCategory.service';

@Component({
  selector: 'app-customer-category-detail',
  templateUrl: './customer-category-detail.component.html',
  styleUrls: ['./customer-category-detail.component.css']
})
export class CustomerCategoryDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public customerCategoryService: CustomerCategoryService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CustomerCategoryDetailComponent>,
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
    this.customerCategoryService.save(form.value).subscribe(
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