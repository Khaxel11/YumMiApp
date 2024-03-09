import { TestBed } from '@angular/core/testing';

import { AplicacionesService } from './aplicaciones.service';

describe('AplicacionesService', () => {
  let service: AplicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
