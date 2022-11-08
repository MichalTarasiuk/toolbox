/**
 * The inferType returns a string indicating the type of the operand's value.
 *
 * @param operand An expression representing the object or primitive whose type is to be returned.
 * @param exact Defines whether typeof is to be exact.
 *
 * @returns Type of operand.
 */
export const inferType = (operand: unknown, exact: boolean = false): string => {
  const type = typeof operand

  if (type !== 'object' && !exact) {
    return type
  }

  const exactType = Object.prototype.toString
    .call(operand)
    .replace(/^\[object (\S+)\]$/, '$1')

  return exactType.toLowerCase()
}
