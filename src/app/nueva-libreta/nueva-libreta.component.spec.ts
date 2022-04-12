import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaLibretaComponent } from './nueva-libreta.component';

describe('NuevaLibretaComponent', () => {
  let component: NuevaLibretaComponent;
  let fixture: ComponentFixture<NuevaLibretaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaLibretaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaLibretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
