import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProductIngredientService } from 'src/app/shared/ProductIngredient.service';

@Component({
  selector: 'app-product-ingredient-detail',
  templateUrl: './product-ingredient-detail.component.html',
  styleUrls: ['./product-ingredient-detail.component.css']
})
export class ProductIngredientDetailComponent implements OnInit {

  ID: number = environment.InitializationNumber;
  constructor(
    public productIngredientService: ProductIngredientService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductIngredientDetailComponent>,
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
    this.productIngredientService.save(form.value).subscribe(
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