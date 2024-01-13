import { TestBed } from '@angular/core/testing';

import { FoodHubService } from './food-hub.service';

describe('FoodHubService', () => {
  let service: FoodHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
