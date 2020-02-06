import { ToDatetimePipe } from './to-datetime.pipe';

describe('ToDatetimePipe', () => {
  it('create an instance', () => {
    const pipe = new ToDatetimePipe();
    expect(pipe).toBeTruthy();
  });
});
