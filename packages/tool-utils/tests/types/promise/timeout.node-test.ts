import {sleep, timeout} from '../../../_api';

describe('node - logic:types:promise:timeout', () => {
  const user = {name: 'Michał', age: 19};
  const timeoutMs = 1_000;

  it('should throw error when promise', async () => {
    const [fetchUserPromise] = sleep(timeoutMs, user);

    const resolvedUser = await timeout(fetchUserPromise, timeoutMs + 10);

    expect(user).toEqual(resolvedUser);
  });

  it('should not throw error when promise', async () => {
    const [fetchUserPromise] = sleep(timeoutMs, user);

    try {
      await timeout(fetchUserPromise, timeoutMs - 10);
    } catch (error) {
      expect(error).toEqual(new Error('timed out'));
    }
  });
});
