import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardDetailComponent } from './ward-detail.component';

describe('WardDetailComponent', () => {
  let component: WardDetailComponent;
  let fixture: ComponentFixture<WardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
