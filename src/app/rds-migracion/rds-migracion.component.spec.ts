import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsMigracionComponent } from './rds-migracion.component';

describe('RdsMigracionComponent', () => {
  let component: RdsMigracionComponent;
  let fixture: ComponentFixture<RdsMigracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsMigracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsMigracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
