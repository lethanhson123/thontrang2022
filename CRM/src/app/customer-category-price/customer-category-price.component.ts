import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerCategory } from 'src/app/shared/CustomerCategory.model';
import { CustomerCategoryService } from 'src/app/shared/CustomerCategory.service';
import { CustomerCategoryPrice } from 'src/app/shared/CustomerCategoryPrice.model';
import { CustomerCategoryPriceService } from 'src/app/shared/CustomerCategoryPrice.service';

@Component({
  selector: 'app-customer-category-price',
  templateUrl: './customer-category-price.component.html',
  styleUrls: ['./customer-category-price.component.css']
})
export class CustomerCategoryPriceComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ProductImageURL','ProductDisplay', 'Price', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;
  parentID: number = 1;
  constructor(
    public customerCategoryService: CustomerCategoryService,
    public customerCategoryPriceService: CustomerCategoryPriceService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getCustomerCategoryToList();
  }
  getCustomerCategoryToList() {
    this.customerCategoryService.getAllToList().then(res => {
      this.customerCategoryService.list = res as CustomerCategory[];
    });
  }
  getToList() {
    this.isShowLoading = true;
    this.customerCategoryPriceService.getByParentIDAndSearchStringToList(this.parentID, this.searchString).then(res => {
      this.customerCategoryPriceService.list = res as CustomerCategoryPrice[];
      this.dataSource = new MatTableDataSource(this.customerCategoryPriceService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.getToList();
  }
  onSave(element: CustomerCategoryPrice) {    
    this.customerCategoryPriceService.save(element).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);        
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);        
      }
    );
  }
}
