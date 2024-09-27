import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolCalendarComponent } from './cool-calendar.component';

describe('CoolCalendarComponent', () => {
  let component: CoolCalendarComponent;
  let fixture: ComponentFixture<CoolCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
