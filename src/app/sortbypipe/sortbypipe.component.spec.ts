import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortbypipeComponent } from './sortbypipe.component';

describe('SortbypipeComponent', () => {
  let component: SortbypipeComponent;
  let fixture: ComponentFixture<SortbypipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortbypipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortbypipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
