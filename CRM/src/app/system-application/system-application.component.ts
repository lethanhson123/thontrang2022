import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SystemApplication } from 'src/app/shared/SystemApplication.model';
import { SystemApplicationService } from 'src/app/shared/SystemApplication.service';
import { SystemApplicationDetailComponent } from './system-application-detail/system-application-detail.component';

@Component({
  selector: 'app-system-application',
  templateUrl: './system-application.component.html',
  styleUrls: ['./system-application.component.css']
})
export class SystemApplicationComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'Name', 'Display', 'Code', 'Description', 'Active', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString;

  constructor(
    public systemApplicationService: SystemApplicationService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {
    this.isShowLoading = true;
    this.systemApplicationService.getAllToList().then(res => {
      this.systemApplicationService.list = res as SystemApplication[];
      this.dataSource = new MatTableDataSource(this.systemApplicationService.list);
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
  onAdd(ID: any) {
    this.systemApplicationService.getByID(ID).then(res => {
      this.systemApplicationService.formData = res as SystemApplication;
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(SystemApplicationDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();
    });
  }
}
