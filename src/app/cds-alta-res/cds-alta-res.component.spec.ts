import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsAltaResComponent } from './cds-alta-res.component';

describe('CdsAltaResComponent', () => {
  let component: CdsAltaResComponent;
  let fixture: ComponentFixture<CdsAltaResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdsAltaResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsAltaResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
