import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCsComponent } from './chart-cs.component';

describe('ChartCsComponent', () => {
  let component: ChartCsComponent;
  let fixture: ComponentFixture<ChartCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
