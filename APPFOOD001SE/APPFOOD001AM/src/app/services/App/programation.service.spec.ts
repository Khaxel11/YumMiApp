import { TestBed } from '@angular/core/testing';

import { ProgramationService } from './programation.service';

describe('ProgramationService', () => {
  let service: ProgramationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
