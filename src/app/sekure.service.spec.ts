import { TestBed } from '@angular/core/testing';

import { SekureService } from './sekure.service';

describe('SekureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SekureService = TestBed.get(SekureService);
    expect(service).toBeTruthy();
  });
});
