// FIXME

import { isArray } from '../../source'

import type { Any } from '@flame/typescript'

// @TODO
// - create isEmpty
// - add support for array's (keyIn)

type Collector = ReturnType<typeof createCollector>

const identifier = Symbol()

const isCollector = (value: unknown): value is Collector =>
  isArray(value) && identifier in value

const collectImpl = (a: Any.AnyArray, b: Any.AnyArray) =>
  a.flatMap((aChild) => b.map((bChild) => [aChild, bChild]))

const createCollector = () => {
  const collector: Array<Any.AnyArray> = []
  const boundCollect = collectImpl.bind(collector)

  collector[identifier] = null

  const collect = (anyArray: Any.AnyArray) =>
    collector.concat(boundCollect(anyArray))

  return {
    current: collector,
    collect,
  }
}

const cleanIfCollector = (value: Any.AnyArray | Collector) => {
  if (isCollector(value)) {
    delete value.current[identifier]

    return value.current
  }

  return value
}

const findCollector = (anyArrays: Array<Collector | Any.AnyArray>) =>
  anyArrays.find((anyArray): anyArray is Collector => isCollector(anyArray))

export const combinationsOf = <FirstLoop = true>(
  ...arrays: Array<Any.AnyArray | (FirstLoop extends true ? never : Collector)>
) => {
  const first = arrays.at(0)

  if (!first) {
    throw Error(`combinationsOf: what should i collect ¯\_(ツ)_/¯`)
  }

  if (arrays.length === 1) {
    return cleanIfCollector(first)
  }

  const collector = findCollector(arrays) ?? createCollector()
}

console.log(combinationsOf([], []))
