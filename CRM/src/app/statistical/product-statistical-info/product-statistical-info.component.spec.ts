import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatisticalInfoComponent } from './product-statistical-info.component';

describe('ProductStatisticalInfoComponent', () => {
  let component: ProductStatisticalInfoComponent;
  let fixture: ComponentFixture<ProductStatisticalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatisticalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStatisticalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
