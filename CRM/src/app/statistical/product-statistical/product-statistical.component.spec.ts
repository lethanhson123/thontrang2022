import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatisticalComponent } from './product-statistical.component';

describe('ProductStatisticalComponent', () => {
  let component: ProductStatisticalComponent;
  let fixture: ComponentFixture<ProductStatisticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatisticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
