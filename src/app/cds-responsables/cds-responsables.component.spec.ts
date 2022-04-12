import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsResponsablesComponent } from './cds-responsables.component';

describe('CdsResponsablesComponent', () => {
  let component: CdsResponsablesComponent;
  let fixture: ComponentFixture<CdsResponsablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsResponsablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
