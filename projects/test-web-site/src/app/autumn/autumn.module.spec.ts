import { AutumnModule } from './autumn.module';

describe('AutumnModule', () => {
  let autumnModule: AutumnModule;

  beforeEach(() => {
    autumnModule = new AutumnModule();
  });

  it('should create an instance', () => {
    expect(autumnModule).toBeTruthy();
  });
});
