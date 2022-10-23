import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID','ParentName','Name','Phone','Email','Account','Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  URLSub: string = environment.DomainDestination + "MembershipInfo";
  constructor(
    public membershipService: MembershipService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.membershipService.getBySearchStringToList(this.searchString).then(res => {
      this.membershipService.list = res as Membership[];    
      this.dataSource = new MatTableDataSource(this.membershipService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;     
      this.isShowLoading = false;     
    });
  }
  onSearch() {    
    this.getToList();
  }

}
