import { TestBed } from '@angular/core/testing';

import { TiposNotificacionesService } from './tipos-notificaciones.service';

describe('TiposNotificacionesService', () => {
  let service: TiposNotificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposNotificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
