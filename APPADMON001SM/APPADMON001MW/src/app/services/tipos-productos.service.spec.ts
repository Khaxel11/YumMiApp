import { TestBed } from '@angular/core/testing';

import { TiposProductosService } from './tipos-productos.service';

describe('TiposProductosService', () => {
  let service: TiposProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
