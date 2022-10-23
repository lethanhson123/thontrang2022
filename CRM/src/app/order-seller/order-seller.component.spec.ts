import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellerComponent } from './order-seller.component';

describe('OrderSellerComponent', () => {
  let component: OrderSellerComponent;
  let fixture: ComponentFixture<OrderSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
