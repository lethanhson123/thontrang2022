import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseExportInfoComponent } from './warehouse-export-info.component';

describe('WarehouseExportInfoComponent', () => {
  let component: WarehouseExportInfoComponent;
  let fixture: ComponentFixture<WarehouseExportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseExportInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseExportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
