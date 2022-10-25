import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIngredientStatisticalComponent } from './product-ingredient-statistical.component';

describe('ProductIngredientStatisticalComponent', () => {
  let component: ProductIngredientStatisticalComponent;
  let fixture: ComponentFixture<ProductIngredientStatisticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIngredientStatisticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIngredientStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
