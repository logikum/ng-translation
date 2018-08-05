import { TestBed, inject } from '@angular/core/testing';

import { TranslationService } from './translation.service';

describe('NgTranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService]
    });
  });

  it('should be created', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));
});
