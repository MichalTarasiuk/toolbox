import { castArray, union, chunk, compact } from '../../source/js/array/array'

describe('js:array', () => {
  test('js:array:castArray', () => {
    expect(castArray('hello world')).toEqual(['hello world'])
    expect(castArray(100)).toEqual([100])
  })

  test('js:array:union', () => {
    expect(union([1, 2, 3, 4, 4])).toEqual([1, 2, 3, 4])
    expect(union([3, 2, 1])).toEqual([3, 2, 1])
  })

  test('js:array:chunk', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
    expect(chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]])
  })

  test('js:array:compact', () => {
    expect(compact([1, false, []])).toEqual([1, []])
    expect(compact([1, true, []])).toEqual([1, true, []])
  })
})
