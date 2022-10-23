import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPriceComponent } from './customer-price.component';

describe('CustomerPriceComponent', () => {
  let component: CustomerPriceComponent;
  let fixture: ComponentFixture<CustomerPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
