import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionesDialogComponent } from './confirmaciones-dialog.component';

describe('ConfirmacionesDialogComponent', () => {
  let component: ConfirmacionesDialogComponent;
  let fixture: ComponentFixture<ConfirmacionesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
