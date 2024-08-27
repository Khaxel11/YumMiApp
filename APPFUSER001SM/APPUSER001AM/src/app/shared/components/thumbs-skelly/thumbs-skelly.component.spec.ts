import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbsSkellyComponent } from './thumbs-skelly.component';

describe('ThumbsSkellyComponent', () => {
  let component: ThumbsSkellyComponent;
  let fixture: ComponentFixture<ThumbsSkellyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbsSkellyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbsSkellyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
