import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCancelInfoComponent } from './warehouse-cancel-info.component';

describe('WarehouseCancelInfoComponent', () => {
  let component: WarehouseCancelInfoComponent;
  let fixture: ComponentFixture<WarehouseCancelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCancelInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCancelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
