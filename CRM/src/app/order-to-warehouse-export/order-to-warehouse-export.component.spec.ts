import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderToWarehouseExportComponent } from './order-to-warehouse-export.component';

describe('OrderToWarehouseExportComponent', () => {
  let component: OrderToWarehouseExportComponent;
  let fixture: ComponentFixture<OrderToWarehouseExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderToWarehouseExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderToWarehouseExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
