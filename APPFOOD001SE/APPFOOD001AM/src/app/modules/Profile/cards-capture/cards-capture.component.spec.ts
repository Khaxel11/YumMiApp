import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCaptureComponent } from './cards-capture.component';

describe('CardsCaptureComponent', () => {
  let component: CardsCaptureComponent;
  let fixture: ComponentFixture<CardsCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsCaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
