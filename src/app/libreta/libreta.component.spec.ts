import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibretaComponent } from './libreta.component';

describe('LibretaComponent', () => {
  let component: LibretaComponent;
  let fixture: ComponentFixture<LibretaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibretaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
