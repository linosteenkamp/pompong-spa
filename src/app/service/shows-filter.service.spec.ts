import { TestBed, inject } from '@angular/core/testing';

import { ShowsFilterService } from './shows-filter.service';

describe('ShowsFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowsFilterService]
    });
  });

  it('should ...', inject([ShowsFilterService], (service: ShowsFilterService) => {
    expect(service).toBeTruthy();
  }));
});
