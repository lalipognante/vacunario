import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoInventarioComponent } from './nuevo-inventario.component';

describe('NuevoInventarioComponent', () => {
  let component: NuevoInventarioComponent;
  let fixture: ComponentFixture<NuevoInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
