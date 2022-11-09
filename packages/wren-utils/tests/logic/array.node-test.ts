import {
  castArray,
  union,
  chunk,
  compact,
  asyncFlatMap,
  sleep,
} from '../../_api'

describe('node - logic:array', () => {
  test('logic:array:castArray', () => {
    expect(castArray('hello world')).toEqual(['hello world'])
    expect(castArray(100)).toEqual([100])
  })

  test('logic:array:union', () => {
    expect(union([1, 2, 3, 4, 4])).toEqual([1, 2, 3, 4])
    expect(union([3, 2, 1])).toEqual([3, 2, 1])
  })

  test('logic:array:chunk', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
    expect(chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]])
  })

  test('logic:array:compact', () => {
    expect(compact([1, false, []])).toEqual([1, []])
    expect(compact([1, true, []])).toEqual([1, true, []])
  })

  test('logic:array:asyncFlatMap', async () => {
    const initialArray = [1, 2]

    const asyncArray = await asyncFlatMap(
      initialArray,
      async (digit) => await sleep(0, [digit])[0],
    )

    expect(asyncArray).toEqual(initialArray)
  })
})
