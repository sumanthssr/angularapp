import { TestBed, inject } from '@angular/core/testing';

import { SearchHeadlineApiService } from './search-headline-api.service';

describe('SearchHeadlineApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchHeadlineApiService]
    });
  });

  it('should be created', inject([SearchHeadlineApiService], (service: SearchHeadlineApiService) => {
    expect(service).toBeTruthy();
  }));
});
