import type { Any } from '../../../../jupiter-typescript/_api'

export const hasDuplicates = (array: Any.AnyArray) =>
  [...new Set(array)].length !== array.length
