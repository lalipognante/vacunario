import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsResponsablesInformacionComponent } from './cds-responsables-informacion.component';

describe('CdsResponsablesInformacionComponent', () => {
  let component: CdsResponsablesInformacionComponent;
  let fixture: ComponentFixture<CdsResponsablesInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsResponsablesInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsResponsablesInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
