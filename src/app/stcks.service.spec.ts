import { TestBed } from '@angular/core/testing';

import { StcksService } from './stcks.service';

describe('StcksService', () => {
  let service: StcksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StcksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
