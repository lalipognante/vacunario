import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDetalleComponent } from './cds-detalle.component';

describe('CdsDetalleComponent', () => {
  let component: CdsDetalleComponent;
  let fixture: ComponentFixture<CdsDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
