import { V20Module } from './v2-0.module';

describe('V20Module', () => {
  let v20Module: V20Module;

  beforeEach(() => {
    v20Module = new V20Module();
  });

  it('should create an instance', () => {
    expect(v20Module).toBeTruthy();
  });
});
