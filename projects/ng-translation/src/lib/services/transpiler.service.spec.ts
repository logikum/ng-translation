import { TestBed } from '@angular/core/testing';

import { TranspilerService } from './transpiler.service';

describe('TranspilerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranspilerService = TestBed.get(TranspilerService);
    expect(service).toBeTruthy();
  });
});
