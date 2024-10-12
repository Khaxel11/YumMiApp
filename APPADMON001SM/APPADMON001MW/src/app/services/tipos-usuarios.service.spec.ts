import { TestBed } from '@angular/core/testing';

import { TiposUsuariosService } from './tipos-usuarios.service';

describe('TiposUsuariosService', () => {
  let service: TiposUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
