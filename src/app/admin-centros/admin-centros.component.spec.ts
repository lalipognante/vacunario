import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCentrosComponent } from './admin-centros.component';

describe('AdminCentrosComponent', () => {
  let component: AdminCentrosComponent;
  let fixture: ComponentFixture<AdminCentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCentrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
