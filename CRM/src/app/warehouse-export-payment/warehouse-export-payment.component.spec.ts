import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseExportPaymentComponent } from './warehouse-export-payment.component';

describe('WarehouseExportPaymentComponent', () => {
  let component: WarehouseExportPaymentComponent;
  let fixture: ComponentFixture<WarehouseExportPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseExportPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseExportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
