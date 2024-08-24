import { TestBed } from '@angular/core/testing';

import { CatPersonalService } from './cat-personal.service';

describe('CatPersonalService', () => {
  let service: CatPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
