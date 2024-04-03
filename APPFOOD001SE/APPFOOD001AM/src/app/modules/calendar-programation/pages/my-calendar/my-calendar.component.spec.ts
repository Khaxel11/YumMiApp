import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCalendarComponent } from './my-calendar.component';

describe('MyCalendarComponent', () => {
  let component: MyCalendarComponent;
  let fixture: ComponentFixture<MyCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
