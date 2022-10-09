import { isArray } from '../../source'

// @TODO
// - create isEmpty
// - add support for array's (keyIn)

type Collector = ReturnType<typeof createCollector>

const identifier = Symbol()

const isCollector = (value: unknown): value is Collector =>
  isArray(value) && identifier in value

const collectImpl = (a: AnyArray, b: AnyArray) =>
  a.flatMap((aChild) => b.map((bChild) => [aChild, bChild]))

const createCollector = () => {
  const collector: Array<AnyArray> = []
  const boundCollect = collectImpl.bind(collector)

  collector[identifier] = null

  const collect = (anyArray: AnyArray) =>
    collector.concat(boundCollect(anyArray))

  return {
    current: collector,
    collect,
  }
}

const cleanIfCollector = (value: AnyArray | Collector) => {
  if (isCollector(value)) {
    delete value.current[identifier]

    return value.current
  }

  return value
}

const findCollector = (anyArrays: Array<Collector | AnyArray>) =>
  anyArrays.find((anyArray): anyArray is Collector => isCollector(anyArray))

export const combinationsOf = <FirstLoop = true>(
  ...arrays: Array<AnyArray | (FirstLoop extends true ? never : Collector)>
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
