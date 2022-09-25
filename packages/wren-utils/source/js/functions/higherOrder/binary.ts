/**
 * Creates a function that accepts many arguments, ignoring any additional arguments.
 */
export const binary =
  <Fn extends AnyFunction>(fn: Fn) =>
  (...params: Parameters<Fn>) => {
    return fn(...params) as ReturnType<Fn>
  }
