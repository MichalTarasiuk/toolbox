/**
 * Creates a function that accepts many arguments, ignoring any additional arguments.
 */
export const binary =
	<Fn extends AnyFunction>(fn: Fn) =>
	(...params: Parameters<Fn>) => {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
		return fn(...params) as ReturnType<Fn>
	}
