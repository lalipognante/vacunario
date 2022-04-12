import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsManualComponent } from './rds-manual.component';

describe('RdsManualComponent', () => {
  let component: RdsManualComponent;
  let fixture: ComponentFixture<RdsManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
