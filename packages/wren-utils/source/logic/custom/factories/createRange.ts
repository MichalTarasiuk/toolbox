const secretToken = Symbol()

type RangeObject = {
  read: (token: symbol) => { lower: number; upper: number }
}

export const createRange = (lower: number, upper: number) => {
  if (lower > upper) {
    throw new RangeError('createRange: lower must be less than upper')
  }

  const read = (token: symbol) => {
    if (secretToken !== token) {
      throw Error('range.read: invalid token')
    }

    return {
      lower,
      upper,
    }
  }

  const has = (value: number) => value >= lower && value <= upper

  const intersects = (range: RangeObject) => {
    const compareTo = range.read(secretToken)

    return lower <= compareTo.upper && upper >= compareTo.lower
  }

  const equals = (range: RangeObject) => {
    const compareTo = range.read(secretToken)

    return lower === compareTo.lower && upper === compareTo.upper
  }

  const isSuperrange = (range: RangeObject) => {
    const compareTo = range.read(secretToken)

    return lower <= compareTo.lower && upper >= compareTo.upper
  }

  const isSubrange = (range: RangeObject) => {
    const compareTo = range.read(secretToken)

    return lower >= compareTo.lower && upper <= compareTo.upper
  }

  return {
    read,
    has,
    intersects,
    isSubrange,
    isSuperrange,
    equals,
  }
}
