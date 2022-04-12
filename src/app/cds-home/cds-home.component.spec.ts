import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsHomeComponent } from './cds-home.component';

describe('CdsHomeComponent', () => {
  let component: CdsHomeComponent;
  let fixture: ComponentFixture<CdsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
