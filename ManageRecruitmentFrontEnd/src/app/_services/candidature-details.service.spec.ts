import { TestBed } from '@angular/core/testing';

import { CandidatureDetailsService } from './candidature-details.service';

describe('CandidatureDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatureDetailsService = TestBed.get(CandidatureDetailsService);
    expect(service).toBeTruthy();
  });
});
