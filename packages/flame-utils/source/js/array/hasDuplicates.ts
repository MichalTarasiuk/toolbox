import type { Any } from '@flame/typescript'

export const hasDuplicates = (array: Any.AnyArray) =>
  [...new Set(array)].length !== array.length
