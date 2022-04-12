import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRdialogComponent } from './qrdialog.component';

describe('QRdialogComponent', () => {
  let component: QRdialogComponent;
  let fixture: ComponentFixture<QRdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
