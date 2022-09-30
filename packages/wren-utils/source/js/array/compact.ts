import type { Any, Function, List } from 'ts-toolbelt'

type Compact<Arr extends AnyArray, Result extends AnyArray = []> = Arr extends [
	infer First,
	...infer Rest,
]
	? Any.Contains<First, FalsyValues> extends 1
		? Compact<Rest, Result>
		: Compact<Rest, List.Append<Result, First>>
	: Result

/**
 * Removes falsy values from an array.
 */
export const compact = <Arr extends AnyArray>(array: Function.Narrow<Arr>) =>
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
	array.filter(Boolean) as Compact<Arr>
