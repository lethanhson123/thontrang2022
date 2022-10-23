import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSystemMenuComponent } from './membership-system-menu.component';

describe('MembershipSystemMenuComponent', () => {
  let component: MembershipSystemMenuComponent;
  let fixture: ComponentFixture<MembershipSystemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipSystemMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipSystemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
