import { TestBed } from '@angular/core/testing';

import { TelevisionServiceService } from './television-service.service';

describe('TelevisionServiceService', () => {
  let service: TelevisionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelevisionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
