import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseExport } from 'src/app/shared/WarehouseExport.model';
import { WarehouseExportService } from 'src/app/shared/WarehouseExport.service';
import { WarehouseExportDetail } from 'src/app/shared/WarehouseExportDetail.model';
import { WarehouseExportDetailService } from 'src/app/shared/WarehouseExportDetail.service';
import { Status } from 'src/app/shared/Status.model';
import { StatusService } from 'src/app/shared/Status.service';
import { Company } from 'src/app/shared/Company.model';
import { CompanyService } from 'src/app/shared/Company.service';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { Membership } from 'src/app/shared/Membership.model';
import { MembershipService } from 'src/app/shared/Membership.service';
import { Product } from 'src/app/shared/Product.model';
import { ProductService } from 'src/app/shared/Product.service';
import { Unit } from 'src/app/shared/Unit.model';
import { UnitService } from 'src/app/shared/Unit.service';
import { DownloadService } from 'src/app/shared/Download.service';
import { WarehouseExportDetailSourceComponent } from 'src/app/warehouse-export-detail-source/warehouse-export-detail-source.component';
import { WarehouseExportPaymentComponent } from '../warehouse-export-payment/warehouse-export-payment.component';

@Component({
  selector: 'app-order-to-warehouse-export',
  templateUrl: './order-to-warehouse-export.component.html',
  styleUrls: ['./order-to-warehouse-export.component.css']
})
export class OrderToWarehouseExportComponent implements OnInit {

  dataSourceThonTrang: MatTableDataSource<any>;
  displayColumnsThonTrang: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'Save', 'Delete', 'WarehouseExportDetailSource'];
  @ViewChild(MatSort) sortThonTrang: MatSort;
  @ViewChild(MatPaginator) paginatorThonTrang: MatPaginator;

  dataSourceBiBen: MatTableDataSource<any>;
  displayColumnsBiBen: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'Save', 'Delete', 'WarehouseExportDetailSource'];
  @ViewChild(MatSort) sortBiBen: MatSort;
  @ViewChild(MatPaginator) paginatorBiBen: MatPaginator;

  dataSourceVyTam: MatTableDataSource<any>;
  displayColumnsVyTam: string[] = ['ProductDisplay', 'UnitDisplay', 'Quantity', 'Price', 'Total', 'Save', 'Delete', 'WarehouseExportDetailSource'];
  @ViewChild(MatSort) sortVyTam: MatSort;
  @ViewChild(MatPaginator) paginatorVyTam: MatPaginator;

  isShowLoading: boolean = false;
  active: boolean = true;
  queryString: string = environment.InitializationString;

  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public warehouseExportService: WarehouseExportService,
    public warehouseExportDetailService: WarehouseExportDetailService,
    public statusService: StatusService,
    public companyService: CompanyService,
    public customerService: CustomerService,
    public membershipService: MembershipService,
    public productService: ProductService,
    public unitService: UnitService,
    public downloadService: DownloadService,
    private dialog: MatDialog
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.queryString = event.url;
        this.getProductThonTrangToList('');
        this.getProductBiBenToList('');
        this.getProductVyTamToList('');
        this.getMembershipToList();
        this.getStatusToList();
        this.getByQueryString();
      }
    });
  }

  ngOnInit(): void {
  }
  getProductThonTrangToList(queryString: string) {
    this.productService.getByCompanyIDAndSearchStringToList(environment.CompanyIDThonTrang, queryString).then(res => {
      this.productService.listThonTrang = res as Product[];
      if (this.productService.listThonTrang) {
        if (this.productService.listThonTrang.length) {
          this.warehouseExportDetailService.formDataThonTrang.ProductID = this.productService.listThonTrang[0].ID;
          this.warehouseExportDetailService.formDataThonTrang.Quantity = 1;
          this.warehouseExportDetailService.formDataThonTrang.Price = 0;
        }
      }
    });
  }
  getProductBiBenToList(queryString: string) {
    this.productService.getByCompanyIDAndSearchStringToList(environment.CompanyIDBiBen, queryString).then(res => {
      this.productService.listBiBen = res as Product[];
      if (this.productService.listBiBen) {
        if (this.productService.listBiBen.length) {
          this.warehouseExportDetailService.formDataBiBen.ProductID = this.productService.listBiBen[0].ID;
          this.warehouseExportDetailService.formDataBiBen.Quantity = 1;
          this.warehouseExportDetailService.formDataBiBen.Price = 0;
        }
      }
    });
  }
  getProductVyTamToList(queryString: string) {
    this.productService.getByCompanyIDAndSearchStringToList(environment.CompanyIDVyTam, queryString).then(res => {
      this.productService.listVyTam = res as Product[];
      if (this.productService.listVyTam) {
        if (this.productService.listVyTam.length) {
          this.warehouseExportDetailService.formDataVyTam.ProductID = this.productService.listVyTam[0].ID;
          this.warehouseExportDetailService.formDataVyTam.Quantity = 1;
          this.warehouseExportDetailService.formDataVyTam.Price = 0;
        }
      }
    });
  }
  getMembershipToList() {
    this.membershipService.getAllToList().then(res => {
      this.membershipService.list = res as Membership[];
    });
  }
  getStatusToList() {
    this.statusService.getAllToList().then(res => {
      this.statusService.list = res as Status[];
    });
  }
  onFilterProductThonTrang(searchString: string) {
    this.getProductThonTrangToList(searchString);
  }
  onFilterProductBiBen(searchString: string) {
    this.getProductBiBenToList(searchString);
  }
  onFilterProductVyTam(searchString: string) {
    this.getProductVyTamToList(searchString);
  }

  getByQueryString() {
    this.isShowLoading = true;
    this.warehouseExportService.covertOrderToWarehouseExportByOrderIDAndUserUpdated(this.queryString).then(res => {
      this.isShowLoading = true;
      this.warehouseExportService.getByActiveAndCompanyIDAndParentID(this.active, environment.CompanyIDThonTrang, this.queryString).then(res => {
        this.warehouseExportService.formDataThonTrang = res as WarehouseExport;
        if (this.warehouseExportService.formDataThonTrang) {
          if (this.warehouseExportService.formDataThonTrang.ID) {
            this.getThonTrangByParentIDToList();
          }
          if ((this.warehouseExportService.formDataThonTrang.StatusID == null) || (this.warehouseExportService.formDataThonTrang.StatusID == 0)) {
            if (this.statusService.list) {
              if (this.statusService.list.length) {
                this.warehouseExportService.formDataThonTrang.StatusID = this.statusService.list[0].ID;
              }
            }
          }
          if ((this.warehouseExportService.formDataThonTrang.UserFoundedID == null) || (this.warehouseExportService.formDataThonTrang.UserFoundedID == 0)) {
            this.warehouseExportService.formDataThonTrang.UserFoundedID = this.notificationService.membershipID;
          }
        }
        this.isShowLoading = false;
      });
      this.isShowLoading = true;
      this.warehouseExportService.getByActiveAndCompanyIDAndParentID(this.active, environment.CompanyIDBiBen, this.queryString).then(res => {
        this.warehouseExportService.formDataBiBen = res as WarehouseExport;
        if (this.warehouseExportService.formDataBiBen) {
          if (this.warehouseExportService.formDataBiBen.ID) {
            this.getBiBenByParentIDToList();
          }
          if ((this.warehouseExportService.formDataBiBen.StatusID == null) || (this.warehouseExportService.formDataBiBen.StatusID == 0)) {
            if (this.statusService.list) {
              if (this.statusService.list.length) {
                this.warehouseExportService.formDataBiBen.StatusID = this.statusService.list[0].ID;
              }
            }
          }
          if ((this.warehouseExportService.formDataBiBen.UserFoundedID == null) || (this.warehouseExportService.formDataBiBen.UserFoundedID == 0)) {
            this.warehouseExportService.formDataBiBen.UserFoundedID = this.notificationService.membershipID;
          }
        }
        this.isShowLoading = false;
      });
      this.isShowLoading = true;
      this.warehouseExportService.getByActiveAndCompanyIDAndParentID(this.active, environment.CompanyIDVyTam, this.queryString).then(res => {
        this.warehouseExportService.formDataVyTam = res as WarehouseExport;
        if (this.warehouseExportService.formDataVyTam) {
          if (this.warehouseExportService.formDataVyTam.ID) {
            this.getVyTamByParentIDToList();
          }
          if ((this.warehouseExportService.formDataVyTam.StatusID == null) || (this.warehouseExportService.formDataVyTam.StatusID == 0)) {
            if (this.statusService.list) {
              if (this.statusService.list.length) {
                this.warehouseExportService.formDataVyTam.StatusID = this.statusService.list[0].ID;
              }
            }
          }
          if ((this.warehouseExportService.formDataVyTam.UserFoundedID == null) || (this.warehouseExportService.formDataVyTam.UserFoundedID == 0)) {
            this.warehouseExportService.formDataVyTam.UserFoundedID = this.notificationService.membershipID;
          }
        }
        this.isShowLoading = false;
      });
    });







  }
  getThonTrangByID() {
    this.warehouseExportService.getByID(this.warehouseExportService.formDataThonTrang.ID).then(res => {
      this.warehouseExportService.formDataThonTrang = res as WarehouseExport;
    });
  }
  getThonTrangByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseExportDetailService.getByParentIDToList(this.warehouseExportService.formDataThonTrang.ID).then(res => {
      this.warehouseExportDetailService.listThonTrang = res as WarehouseExportDetail[];
      this.dataSourceThonTrang = new MatTableDataSource(this.warehouseExportDetailService.listThonTrang);
      this.dataSourceThonTrang.sort = this.sortThonTrang;
      this.dataSourceThonTrang.paginator = this.paginatorThonTrang;
      this.isShowLoading = false;
    });
  }
  getBiBenByID() {
    this.warehouseExportService.getByID(this.warehouseExportService.formDataBiBen.ID).then(res => {
      this.warehouseExportService.formDataBiBen = res as WarehouseExport;
    });
  }
  getBiBenByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseExportDetailService.getByParentIDToList(this.warehouseExportService.formDataBiBen.ID).then(res => {
      this.warehouseExportDetailService.listBiBen = res as WarehouseExportDetail[];
      this.dataSourceBiBen = new MatTableDataSource(this.warehouseExportDetailService.listBiBen);
      this.dataSourceBiBen.sort = this.sortBiBen;
      this.dataSourceBiBen.paginator = this.paginatorBiBen;
      this.isShowLoading = false;
    });
  }
  getVyTamByID() {
    this.warehouseExportService.getByID(this.warehouseExportService.formDataVyTam.ID).then(res => {
      this.warehouseExportService.formDataVyTam = res as WarehouseExport;
    });
  }
  getVyTamByParentIDToList() {
    this.isShowLoading = true;
    this.warehouseExportDetailService.getByParentIDToList(this.warehouseExportService.formDataVyTam.ID).then(res => {
      this.warehouseExportDetailService.listVyTam = res as WarehouseExportDetail[];
      this.dataSourceVyTam = new MatTableDataSource(this.warehouseExportDetailService.listVyTam);
      this.dataSourceVyTam.sort = this.sortVyTam;
      this.dataSourceVyTam.paginator = this.paginatorVyTam;
      this.isShowLoading = false;
    });
  }
  onSaveDetail(element: WarehouseExportDetail) {
    this.isShowLoading = true;
    this.warehouseExportDetailService.save(element).subscribe(
      res => {
        this.getThonTrangByParentIDToList();
        this.getThonTrangByID();
        this.getBiBenByParentIDToList();
        this.getBiBenByID();
        this.getVyTamByParentIDToList();
        this.getVyTamByID();
        this.notificationService.success(environment.SaveSuccess);
        this.isShowLoading = false;

      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }

  onAddDetailThonTrang() {
    this.warehouseExportDetailService.formDataThonTrang.ParentID = this.warehouseExportDetailService.formDataThonTrang.ID
    this.onSaveDetail(this.warehouseExportDetailService.formDataThonTrang);
  }
  onAddDetailBiBen() {
    this.warehouseExportDetailService.formDataBiBen.ParentID = this.warehouseExportDetailService.formDataBiBen.ID
    this.onSaveDetail(this.warehouseExportDetailService.formDataBiBen);
  }
  onAddDetailVyTam() {
    this.warehouseExportDetailService.formDataVyTam.ParentID = this.warehouseExportDetailService.formDataVyTam.ID
    this.onSaveDetail(this.warehouseExportDetailService.formDataVyTam);
  }
  onUpdateDetail(element: WarehouseExportDetail) {
    this.onSaveDetail(element);
  }
  onDeleteDetail(element: WarehouseExportDetail) {
    if (confirm(environment.DeleteConfirm)) {
      this.warehouseExportDetailService.remove(element.ID).then(res => {
        this.getThonTrangByParentIDToList();
        this.getThonTrangByID();
        this.getBiBenByParentIDToList();
        this.getBiBenByID();
        this.getVyTamByParentIDToList();
        this.getVyTamByID();
        this.notificationService.success(environment.DeleteSuccess);
      });
    }
  }
  onWarehouseExportDetailSource(element: WarehouseExportDetail) {
    this.warehouseExportDetailService.formDataWarehouseExportDetailSource = element;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    dialogConfig.data = { ID: element.ID };
    const dialog = this.dialog.open(WarehouseExportDetailSourceComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
    });
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.orderByIDToHTML(this.warehouseExportService.formDataThonTrang.ParentID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onWarehouseExportPayment(ID: number) {
    this.warehouseExportService.ID = ID;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    dialogConfig.data = { ID: this.warehouseExportService.ID };
    const dialog = this.dialog.open(WarehouseExportPaymentComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
    });
  }
}
