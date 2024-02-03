import { TestBed } from '@angular/core/testing';

import { FTPServiceService } from './ftpservice.service';

describe('FTPServiceService', () => {
  let service: FTPServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FTPServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
