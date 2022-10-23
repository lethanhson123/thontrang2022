import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCategoryComponent } from './membership-category.component';

describe('MembershipCategoryComponent', () => {
  let component: MembershipCategoryComponent;
  let fixture: ComponentFixture<MembershipCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
