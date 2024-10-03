import { TestBed } from '@angular/core/testing';

import { OpcMenuCargoService } from './opc-menu-cargo.service';

describe('OpcMenuCargoService', () => {
  let service: OpcMenuCargoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcMenuCargoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
