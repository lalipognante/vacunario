import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsColocarViaDniComponent } from './rds-colocar-via-dni.component';

describe('RdsColocarViaDniComponent', () => {
  let component: RdsColocarViaDniComponent;
  let fixture: ComponentFixture<RdsColocarViaDniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsColocarViaDniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsColocarViaDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
