import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-customer-debt',
  templateUrl: './customer-debt.component.html',
  styleUrls: ['./customer-debt.component.css']
})
export class CustomerDebtComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'ParentName','Name','DebtThonTrang','DebtBiben','DebtVyTam','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  URLSub: string = environment.DomainDestination + "CustomerDebtInfo";
  constructor(
    public customerService: CustomerService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.customerService.getBySearchStringToList(this.searchString).then(res => {
      this.customerService.list = res as Customer[];    
      this.dataSource = new MatTableDataSource(this.customerService.list.sort((a, b) => (a.DebtThonTrang < b.DebtThonTrang ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;     
      this.isShowLoading = false;     
    });
  }
  onSearch() {
    if (this.searchString.length > 0) {
      this.dataSource.filter = this.searchString.toLowerCase();
    }
    else {
      this.getToList();
    }
  }

}
