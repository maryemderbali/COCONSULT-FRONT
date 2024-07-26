import { TestBed } from '@angular/core/testing';

import { ActivitySalesTeamService } from './activity-sales-team.service';

describe('ActivitySalesTeamService', () => {
  let service: ActivitySalesTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitySalesTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
