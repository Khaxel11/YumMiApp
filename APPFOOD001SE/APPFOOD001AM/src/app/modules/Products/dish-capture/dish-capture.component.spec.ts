import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCaptureComponent } from './dish-capture.component';

describe('DishCaptureComponent', () => {
  let component: DishCaptureComponent;
  let fixture: ComponentFixture<DishCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishCaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
