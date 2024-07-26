import { TestBed } from '@angular/core/testing';

import { RoomConfigurationService } from './room-configuration.service';

describe('RoomConfigurationService', () => {
  let service: RoomConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
