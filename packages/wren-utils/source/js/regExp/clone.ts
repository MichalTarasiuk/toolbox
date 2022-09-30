/**
 * Clones a regular expression.
 */
export const cloneRegExp = (regExp: RegExp) =>
	new RegExp(regExp.source, regExp.flags)
