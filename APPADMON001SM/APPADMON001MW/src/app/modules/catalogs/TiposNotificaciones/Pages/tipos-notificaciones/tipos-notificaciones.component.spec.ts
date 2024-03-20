import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposNotificacionesComponent } from './tipos-notificaciones.component';

describe('TiposNotificacionesComponent', () => {
  let component: TiposNotificacionesComponent;
  let fixture: ComponentFixture<TiposNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
