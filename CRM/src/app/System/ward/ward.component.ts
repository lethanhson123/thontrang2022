import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Province } from 'src/app/shared/Province.model';
import { ProvinceService } from 'src/app/shared/Province.service';
import { District } from 'src/app/shared/District.model';
import { DistrictService } from 'src/app/shared/District.service';
import { Ward } from 'src/app/shared/Ward.model';
import { WardService } from 'src/app/shared/Ward.service';
import { WardDetailComponent } from './ward-detail/ward-detail.component';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateUpdated','ID','Name','Display','Code','Active','actions'];  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isShowLoading: boolean = false;
  searchString: string = environment.InitializationString; 
  provinceID: number = 51; 
  districtID: number = 583; 
  constructor(
    public provinceService: ProvinceService,
    public districtService: DistrictService,
    public wardService: WardService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProvinceToList();
    this.getDistrictToList();
    this.getToList();
  }
  getProvinceToList() {        
    this.provinceService.getByActiveToList(true).then(res => {
      this.provinceService.list = res as Province[];            
    });
  }
  getDistrictToList() {        
    this.districtService.getByParentIDToList(this.provinceID).then(res => {
      this.districtService.list = res as District[];            
    });
  }
  getToList() {    
    this.isShowLoading = true;
    this.wardService.getByParentIDToList(this.districtID).then(res => {
      this.wardService.list = res as Ward[];      
      this.dataSource = new MatTableDataSource(this.wardService.list.sort((a, b) => (a.Name > b.Name ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
      this.isShowLoading = false;
    });
  }
  onSearch() {    
    this.getToList();
  }
  onChangeProvince($event) {
    this.getDistrictToList();
  }
  onAdd(ID: any) {    
    this.wardService.getByID(ID).then(res => {
      this.wardService.formData = res as District;      
    });    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;    
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(WardDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();      
    });    
  }
}

