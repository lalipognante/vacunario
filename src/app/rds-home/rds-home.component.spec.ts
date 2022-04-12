import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsHomeComponent } from './rds-home.component';

describe('RdsHomeComponent', () => {
  let component: RdsHomeComponent;
  let fixture: ComponentFixture<RdsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
