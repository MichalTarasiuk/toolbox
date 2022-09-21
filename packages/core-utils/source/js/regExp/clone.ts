// @TODO: add description
export const cloneRegExp = (regExp: RegExp) =>
  new RegExp(regExp.source, regExp.flags)
