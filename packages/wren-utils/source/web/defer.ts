// @TODO: add documentation
export const defer = <Fn extends AnyFunction>(
  fn: Fn,
  ...params: Parameters<Fn>
) => setTimeout(fn, 0, ...params)
