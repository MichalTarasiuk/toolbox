import { renderHook } from '@testing-library/react-hooks'

import { useCustomCompareMemo } from '../../source/hooks/hooks'

type User = typeof mockUser
const mockUser = { name: 'John' }

describe('useCustomCompareMemo', () => {
  it(`should't invoke factory function on each rerender`, () => {
    type Props = { user: User }
    const { result, rerender } = renderHook(
      ({ user }: Props) =>
        useCustomCompareMemo(
          () => user,
          [user],
          () => true,
        ),
      { initialProps: { user: mockUser } },
    )

    rerender({ user: { name: 'Jack' } })

    expect(result.current).toBe(mockUser)
  })

  it('should invoke factory function when user name is not the same', () => {
    type Props = { user: User }
    const { result, rerender } = renderHook(
      ({ user }: Props) =>
        useCustomCompareMemo(
          () => user,
          [user],
          (savedDeps, deps) => savedDeps[0].name === deps[0].name,
        ),
      { initialProps: { user: mockUser } },
    )

    rerender({ user: { name: 'John' } })

    expect(result.current).toBe(mockUser)

    const newUser = { name: 'Mike' }
    rerender({ user: newUser })

    expect(result.current).toBe(newUser)
  })
})
