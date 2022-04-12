import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsEscaneoComponent } from './rds-escaneo.component';

describe('RdsEscaneoComponent', () => {
  let component: RdsEscaneoComponent;
  let fixture: ComponentFixture<RdsEscaneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsEscaneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsEscaneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
