import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByDateComponent } from './product-by-date.component';

describe('ProductByDateComponent', () => {
  let component: ProductByDateComponent;
  let fixture: ComponentFixture<ProductByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
