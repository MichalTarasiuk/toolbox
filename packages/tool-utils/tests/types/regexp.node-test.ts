import {regExpUnion} from '../../_api';

describe('node - utils:type:regexp', () => {
  it('should merge regexps', () => {
    expect(regExpUnion(/hello/g, /hey/).source).toBe('(hello)|(hey)');
    expect(regExpUnion(/hello/g, /(world | Michał)/).source).toBe('(hello)|((world | Michał))');
  });
});
