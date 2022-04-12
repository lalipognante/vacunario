import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunaColocadaComponent } from './vacuna-colocada.component';

describe('VacunaColocadaComponent', () => {
  let component: VacunaColocadaComponent;
  let fixture: ComponentFixture<VacunaColocadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunaColocadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunaColocadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
