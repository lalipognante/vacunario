import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsColocarComponent } from './rds-colocar.component';

describe('RdsColocarComponent', () => {
  let component: RdsColocarComponent;
  let fixture: ComponentFixture<RdsColocarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsColocarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsColocarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
