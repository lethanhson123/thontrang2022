import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseImportInfoComponent } from './warehouse-import-info.component';

describe('WarehouseImportInfoComponent', () => {
  let component: WarehouseImportInfoComponent;
  let fixture: ComponentFixture<WarehouseImportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseImportInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseImportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
