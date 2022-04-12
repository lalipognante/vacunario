import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsLoginComponent } from './rds-login.component';

describe('RdsLoginComponent', () => {
  let component: RdsLoginComponent;
  let fixture: ComponentFixture<RdsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
