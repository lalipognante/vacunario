import { TestBed } from '@angular/core/testing';

import { RdsService } from './rds.service';

describe('RdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RdsService = TestBed.get(RdsService);
    expect(service).toBeTruthy();
  });
});
