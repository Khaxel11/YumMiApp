import { TestBed } from '@angular/core/testing';

import { TiposSolicitudesService } from './tipos-solicitudes.service';

describe('TiposSolicitudesService', () => {
  let service: TiposSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
