import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsFooterComponent } from './rds-footer.component';

describe('RdsFooterComponent', () => {
  let component: RdsFooterComponent;
  let fixture: ComponentFixture<RdsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
