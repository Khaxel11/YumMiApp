import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCsComponent } from './card-cs.component';

describe('CardCsComponent', () => {
  let component: CardCsComponent;
  let fixture: ComponentFixture<CardCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
