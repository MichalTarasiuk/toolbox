// @TODO: add description
export const binary =
  <Fn extends AnyFunction>(fn: Fn) =>
  (...params: Parameters<Fn>) => {
    return fn(...params) as ReturnType<Fn>
  }
