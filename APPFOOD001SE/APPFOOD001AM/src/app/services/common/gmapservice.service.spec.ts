import { TestBed } from '@angular/core/testing';

import { GmapserviceService } from './gmapservice.service';

describe('GmapserviceService', () => {
  let service: GmapserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GmapserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
