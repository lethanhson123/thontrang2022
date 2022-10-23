import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCategoryDetailComponent } from './membership-category-detail.component';

describe('MembershipCategoryDetailComponent', () => {
  let component: MembershipCategoryDetailComponent;
  let fixture: ComponentFixture<MembershipCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipCategoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
