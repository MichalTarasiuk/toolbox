export type Split<
  Value extends string,
  Spliter extends string,
> = Value extends `${infer First}${Spliter}${infer Rest}`
  ? [First, ...Split<Rest, Spliter>]
  : [Value]
