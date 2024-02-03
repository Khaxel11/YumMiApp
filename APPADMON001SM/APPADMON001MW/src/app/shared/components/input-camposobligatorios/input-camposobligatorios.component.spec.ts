import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCamposobligatoriosComponent } from './input-camposobligatorios.component';

describe('InputCamposobligatoriosComponent', () => {
  let component: InputCamposobligatoriosComponent;
  let fixture: ComponentFixture<InputCamposobligatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCamposobligatoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCamposobligatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
