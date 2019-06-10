import { SummerModule } from './summer.module';

describe('SummerModule', () => {
  let summerModule: SummerModule;

  beforeEach(() => {
    summerModule = new SummerModule();
  });

  it('should create an instance', () => {
    expect(summerModule).toBeTruthy();
  });
});
