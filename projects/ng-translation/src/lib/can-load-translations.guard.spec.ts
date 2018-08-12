import { TestBed, async, inject } from '@angular/core/testing';

import { CanLoadTranslationsGuard } from './can-load-translations.guard';

describe('CanLoadTranslationsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanLoadTranslationsGuard]
    });
  });

  it('should ...', inject([CanLoadTranslationsGuard], (guard: CanLoadTranslationsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
