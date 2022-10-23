import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseExportDetailSourceComponent } from './warehouse-export-detail-source.component';

describe('WarehouseExportDetailSourceComponent', () => {
  let component: WarehouseExportDetailSourceComponent;
  let fixture: ComponentFixture<WarehouseExportDetailSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseExportDetailSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseExportDetailSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
