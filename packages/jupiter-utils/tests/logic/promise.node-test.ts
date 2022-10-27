import { timeout, settled, sleep, expectType } from '../../_api'

import type { Any } from '@jupiter/typescript'

describe('node - logic:promise', () => {
  it('logic:promise:sleep', async () => {
    const user = { name: 'Michał', age: 19 }
    const [fetchUser] = sleep(1000, user)

    const fetchedUser = await fetchUser

    expect(fetchedUser).toEqual(user)
  })

  it('logic:promise:timeout', async () => {
    const user = { name: 'Michał', age: 19 }
    const timeoutMs = 1000
    const [fetchUserPromise] = sleep(timeoutMs, user)

    try {
      await timeout(fetchUserPromise, timeoutMs - 1)
    } catch (error) {
      expect(error).toEqual(new Error('timed out'))
    }

    const fetchedUser = await timeout(fetchUserPromise, timeoutMs + 1)
    expect(fetchedUser).toEqual(user)
  })

  it('logic:promise:settled', async () => {
    const user = { name: 'Michał', age: 19 }
    const [fetchUserPromise] = sleep(1000, user)

    const [fetchedUser, error] = await settled(fetchUserPromise)

    if (error) {
      expectType<undefined>(fetchedUser)

      return
    }

    expectType<Any.AnyObject>(fetchedUser)

    expect(fetchedUser).toBe(user)
  })
})
