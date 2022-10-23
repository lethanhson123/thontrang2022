import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMenuDetailComponent } from './system-menu-detail.component';

describe('SystemMenuDetailComponent', () => {
  let component: SystemMenuDetailComponent;
  let fixture: ComponentFixture<SystemMenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemMenuDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
