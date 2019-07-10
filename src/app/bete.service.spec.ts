import { TestBed } from '@angular/core/testing';

import { BeteService } from './bete.service';

describe('BeteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeteService = TestBed.get(BeteService);
    expect(service).toBeTruthy();
  });
});
