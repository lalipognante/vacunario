import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsInventarioComponent } from './cds-inventario.component';

describe('CdsInventarioComponent', () => {
  let component: CdsInventarioComponent;
  let fixture: ComponentFixture<CdsInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
