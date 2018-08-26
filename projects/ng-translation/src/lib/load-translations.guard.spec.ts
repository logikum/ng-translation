import { TestBed, async, inject } from '@angular/core/testing';

import { LoadTranslationsGuard } from './load-translations.guard';

describe('CanLoadTranslationsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadTranslationsGuard]
    });
  });

  it('should ...', inject([LoadTranslationsGuard], (guard: LoadTranslationsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
