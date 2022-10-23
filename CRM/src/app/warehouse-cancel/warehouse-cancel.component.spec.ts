import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCancelComponent } from './warehouse-cancel.component';

describe('WarehouseCancelComponent', () => {
  let component: WarehouseCancelComponent;
  let fixture: ComponentFixture<WarehouseCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
