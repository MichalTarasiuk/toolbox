import type { Any } from '@jupiter/typescript'

export const hasDuplicates = (array: Any.AnyArray) =>
  [...new Set(array)].length !== array.length
