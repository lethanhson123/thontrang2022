import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIngredientDetailComponent } from './product-ingredient-detail.component';

describe('ProductIngredientDetailComponent', () => {
  let component: ProductIngredientDetailComponent;
  let fixture: ComponentFixture<ProductIngredientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIngredientDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIngredientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
