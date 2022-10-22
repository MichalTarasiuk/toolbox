import type { Any, Custom } from '@jupiter/typescript'

export const asyncFlatMap = async <Array extends Any.AnyArray, Result>(
  array: Custom.Narrow<Array>,
  asyncFn: (value: Array[number]) => Promise<Result>,
) => flatten(await Promise.all(array.map(asyncFn)))

const flatten = (array: Any.AnyArray) => {
  const initial: Any.AnyArray = []

  return initial.concat(...array)
}
