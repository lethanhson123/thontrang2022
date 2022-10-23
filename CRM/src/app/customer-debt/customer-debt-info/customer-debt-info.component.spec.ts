import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDebtInfoComponent } from './customer-debt-info.component';

describe('CustomerDebtInfoComponent', () => {
  let component: CustomerDebtInfoComponent;
  let fixture: ComponentFixture<CustomerDebtInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDebtInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDebtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
