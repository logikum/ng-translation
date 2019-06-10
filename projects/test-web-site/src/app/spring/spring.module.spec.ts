import { SpringModule } from './spring.module';

describe('SpringModule', () => {
  let springModule: SpringModule;

  beforeEach(() => {
    springModule = new SpringModule();
  });

  it('should create an instance', () => {
    expect(springModule).toBeTruthy();
  });
});
