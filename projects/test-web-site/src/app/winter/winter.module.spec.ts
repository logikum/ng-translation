import { WinterModule } from './winter.module';

describe('WinterModule', () => {
  let winterModule: WinterModule;

  beforeEach(() => {
    winterModule = new WinterModule();
  });

  it('should create an instance', () => {
    expect(winterModule).toBeTruthy();
  });
});
