import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSystemApplicationComponent } from './membership-system-application.component';

describe('MembershipSystemApplicationComponent', () => {
  let component: MembershipSystemApplicationComponent;
  let fixture: ComponentFixture<MembershipSystemApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipSystemApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipSystemApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
