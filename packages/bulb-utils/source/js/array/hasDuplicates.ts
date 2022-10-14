import type { Any } from '@bulb/typescript'

export const hasDuplicates = (array: Any.AnyArray) =>
  [...new Set(array)].length !== array.length
