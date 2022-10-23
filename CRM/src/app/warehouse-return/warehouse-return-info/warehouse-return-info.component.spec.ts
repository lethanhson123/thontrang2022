import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseReturnInfoComponent } from './warehouse-return-info.component';

describe('WarehouseReturnInfoComponent', () => {
  let component: WarehouseReturnInfoComponent;
  let fixture: ComponentFixture<WarehouseReturnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseReturnInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseReturnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
