import { TestBed } from '@angular/core/testing';

import { TiposAlimentacionService } from './tipos-alimentacion.service';

describe('TiposAlimentacionService', () => {
  let service: TiposAlimentacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposAlimentacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
