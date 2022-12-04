import {resolve} from '../../../_api';

import type {Resolvable} from '../../../_api';

describe('node - logic:types:functions:resolve', () => {
  it('should return value when is not resolvable', () => {
    const resolveable: Resolvable<1> = 1;
    const resolved = resolve(resolveable);

    expect(resolved).toBe(1);
  });

  it('should resolve value when is resolvable', () => {
    const resolveable: Resolvable<1> = () => 1;
    const resolved = resolve(resolveable);

    expect(resolved).toBe(1);
  });
});
