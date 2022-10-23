import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Unit } from 'src/app/shared/Unit.model';
import { UnitService } from 'src/app/shared/Unit.service';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['UserUpdated','DateUpdated','ID','Name','Display','Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  
  constructor(
    public unitService: UnitService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToList();
  }
  getToList() {    
    this.isShowLoading = true;
    this.unitService.getBySearchStringToList(this.searchString).then(res => {
      this.unitService.list = res as Unit[];      
      this.dataSource = new MatTableDataSource(this.unitService.list.sort((a, b) => (a.Name > b.Name ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
      this.isShowLoading = false;
    });
  }
  onSearch() {    
    this.getToList();
  }
  onAdd(ID: any) {    
    this.unitService.getByID(ID).then(res => {
      this.unitService.formData = res as Unit;      
    });    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;    
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(UnitDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();      
    });    
  }
}
