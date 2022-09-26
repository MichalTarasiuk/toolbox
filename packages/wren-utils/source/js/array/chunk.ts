import type { Function, List } from 'ts-toolbelt'

type Chunk<
  Arr extends AnyArray,
  Size extends number,
  Item extends AnyArray = readonly [],
  Items extends ReadonlyArray<AnyArray> = readonly [],
> = Arr extends readonly [infer First, ...infer Rest]
  ? List.Length<Item> extends Size
    ? Chunk<Rest, Size, readonly [First], List.Append<Items, Item>>
    : Chunk<Rest, Size, List.Append<Item, First>, Items>
  : List.Append<Items, Item>

/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @param size - Max length of chunk item.
 */
export const chunk = <Arr extends AnyArray, Size extends number>(
  arr: Function.Narrow<Arr>,
  size: Size,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  ) as Chunk<Arr, Size>
