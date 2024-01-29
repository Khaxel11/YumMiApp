import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsVisualizationComponent } from './events-visualization.component';

describe('EventsVisualizationComponent', () => {
  let component: EventsVisualizationComponent;
  let fixture: ComponentFixture<EventsVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
