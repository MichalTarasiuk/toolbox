import type { Any } from '@brainless/typescript'

export const hasDuplicates = (array: Any.AnyArray) =>
  [...new Set(array)].length !== array.length
