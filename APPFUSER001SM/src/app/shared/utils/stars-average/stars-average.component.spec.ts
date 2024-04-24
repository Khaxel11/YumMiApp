import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsAverageComponent } from './stars-average.component';

describe('StarsAverageComponent', () => {
  let component: StarsAverageComponent;
  let fixture: ComponentFixture<StarsAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsAverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
