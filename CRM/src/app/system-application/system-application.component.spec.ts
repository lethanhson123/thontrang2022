import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemApplicationComponent } from './system-application.component';

describe('SystemApplicationComponent', () => {
  let component: SystemApplicationComponent;
  let fixture: ComponentFixture<SystemApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
