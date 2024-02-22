import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSwipperComponent } from './card-swipper.component';

describe('CardSwipperComponent', () => {
  let component: CardSwipperComponent;
  let fixture: ComponentFixture<CardSwipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSwipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSwipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
