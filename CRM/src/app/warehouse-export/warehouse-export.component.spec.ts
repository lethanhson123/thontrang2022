import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseExportComponent } from './warehouse-export.component';

describe('WarehouseExportComponent', () => {
  let component: WarehouseExportComponent;
  let fixture: ComponentFixture<WarehouseExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
