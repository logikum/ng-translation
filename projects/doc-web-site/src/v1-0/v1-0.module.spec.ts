import { V10Module } from './v1-0.module';

describe('V11Module', () => {
  let v11Module: V10Module;

  beforeEach(() => {
    v11Module = new V10Module();
  });

  it('should create an instance', () => {
    expect(v11Module).toBeTruthy();
  });
});
