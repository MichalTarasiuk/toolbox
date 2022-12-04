import {settled, sleep, expectType} from '../../../_api';

import type {Any} from '@tool/typescript';

describe('node - logic:types:promise', () => {
  it('should create promise with `1` second delay', async () => {
    const user = {name: 'Michał', age: 19};
    const [fetchUser] = sleep(1000, user);

    const fetchedUser = await fetchUser;

    expect(fetchedUser).toEqual(user);
  });

  it('should settle promise', async () => {
    const user = {name: 'Michał', age: 19};
    const [fetchUserPromise] = sleep(1000, user);

    const [fetchedUser, error] = await settled(fetchUserPromise);

    if (error) {
      expectType<undefined>(fetchedUser);

      return;
    } else {
      expectType<Any.AnyObject>(fetchedUser);

      expect(fetchedUser).toBe(user);
    }
  });
});
