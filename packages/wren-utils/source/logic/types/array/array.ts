export * from './toArray'
export * from './union'
export * from './compact'
export * from './chunk'
export * from './asyncFlatMap'

import type { Any } from '@wren/typescript'

export const hasDuplicates = (array: Any.AnyArray) =>
  [...new Set(array)].length !== array.length
