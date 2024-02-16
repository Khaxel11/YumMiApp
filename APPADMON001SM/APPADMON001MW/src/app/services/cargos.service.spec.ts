import { TestBed } from '@angular/core/testing';

import { CargosService } from './cargos.service';

describe('CargosService', () => {
  let service: CargosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
