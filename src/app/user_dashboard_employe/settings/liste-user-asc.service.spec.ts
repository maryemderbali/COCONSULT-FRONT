import { TestBed } from '@angular/core/testing';

import { ListeUserAscService } from './liste-user-asc.service';

describe('ListeUserAscService', () => {
  let service: ListeUserAscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeUserAscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
