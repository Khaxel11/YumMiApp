import { TestBed } from '@angular/core/testing';

import { CatcategoriasService } from './catcategorias.service';

describe('CatcategoriasService', () => {
  let service: CatcategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatcategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
