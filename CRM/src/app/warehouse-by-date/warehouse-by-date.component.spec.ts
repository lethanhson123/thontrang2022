import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseByDateComponent } from './warehouse-by-date.component';

describe('WarehouseByDateComponent', () => {
  let component: WarehouseByDateComponent;
  let fixture: ComponentFixture<WarehouseByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
