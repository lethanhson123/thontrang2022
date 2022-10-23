import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCategoryPriceComponent } from './customer-category-price.component';

describe('CustomerCategoryPriceComponent', () => {
  let component: CustomerCategoryPriceComponent;
  let fixture: ComponentFixture<CustomerCategoryPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCategoryPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCategoryPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
