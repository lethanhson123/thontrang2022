import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemApplicationDetailComponent } from './system-application-detail.component';

describe('SystemApplicationDetailComponent', () => {
  let component: SystemApplicationDetailComponent;
  let fixture: ComponentFixture<SystemApplicationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemApplicationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
