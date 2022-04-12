import { TestBed } from '@angular/core/testing';

import { LibretasService } from './libretas.service';

describe('LibretasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibretasService = TestBed.get(LibretasService);
    expect(service).toBeTruthy();
  });
});
