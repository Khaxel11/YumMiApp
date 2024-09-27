import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesDisponiblesComponent } from './opcionesdisponibles.component';

describe('opcionesDisponiblesComponent', () => {
  let component: OpcionesDisponiblesComponent;
  let fixture: ComponentFixture<OpcionesDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
