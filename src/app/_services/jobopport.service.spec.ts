import { TestBed } from '@angular/core/testing';

import { JobopportService } from './jobopport.service';

describe('JobopportService', () => {
  let service: JobopportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobopportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
