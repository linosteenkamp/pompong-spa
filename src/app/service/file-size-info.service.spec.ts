import { TestBed, inject } from '@angular/core/testing';

import { FileSizeInfoService } from './file-size-info.service';

describe('FileSizeInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileSizeInfoService]
    });
  });

  it('should ...', inject([FileSizeInfoService], (service: FileSizeInfoService) => {
    expect(service).toBeTruthy();
  }));
});
