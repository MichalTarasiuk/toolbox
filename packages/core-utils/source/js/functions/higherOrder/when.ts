export const when =
  (
    predicate: (value: unknown) => boolean,
    whenTrue: (value: unknown) => boolean,
  ) =>
  (value: unknown) =>
    predicate(value) ? whenTrue(value) : value
