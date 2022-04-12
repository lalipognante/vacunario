import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferirComponent } from './tranferir.component';

describe('TranferirComponent', () => {
  let component: TranferirComponent;
  let fixture: ComponentFixture<TranferirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranferirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
