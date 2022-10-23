import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCategoryDetailComponent } from './customer-category-detail.component';

describe('CustomerCategoryDetailComponent', () => {
  let component: CustomerCategoryDetailComponent;
  let fixture: ComponentFixture<CustomerCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCategoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
