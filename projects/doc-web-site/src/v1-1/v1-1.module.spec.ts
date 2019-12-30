import { V11Module } from './v1-1.module';

describe('V11Module', () => {
  let v11Module: V11Module;

  beforeEach(() => {
    v11Module = new V11Module();
  });

  it('should create an instance', () => {
    expect(v11Module).toBeTruthy();
  });
});
