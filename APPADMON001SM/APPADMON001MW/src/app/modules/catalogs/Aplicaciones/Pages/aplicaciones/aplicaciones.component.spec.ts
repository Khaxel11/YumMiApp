import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionesComponent } from './aplicaciones.component';

describe('AplicacionesComponent', () => {
  let component: AplicacionesComponent;
  let fixture: ComponentFixture<AplicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
