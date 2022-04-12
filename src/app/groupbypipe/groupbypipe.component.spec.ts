import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupbypipeComponent } from './groupbypipe.component';

describe('GroupbypipeComponent', () => {
  let component: GroupbypipeComponent;
  let fixture: ComponentFixture<GroupbypipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupbypipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupbypipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
