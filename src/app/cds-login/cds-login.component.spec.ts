import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsLoginComponent } from './cds-login.component';

describe('CdsLoginComponent', () => {
  let component: CdsLoginComponent;
  let fixture: ComponentFixture<CdsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
