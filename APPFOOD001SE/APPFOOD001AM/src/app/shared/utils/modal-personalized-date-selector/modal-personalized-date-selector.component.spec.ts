import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPersonalizedDateSelectorComponent } from './modal-personalized-date-selector.component';

describe('ModalPersonalizedDateSelectorComponent', () => {
  let component: ModalPersonalizedDateSelectorComponent;
  let fixture: ComponentFixture<ModalPersonalizedDateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPersonalizedDateSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPersonalizedDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
