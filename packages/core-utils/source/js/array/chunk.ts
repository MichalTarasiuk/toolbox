import type { Function, List } from 'ts-toolbelt'

type Chunk<
  Arr extends AnyArray,
  Size extends number,
  Item extends AnyArray = [],
  Items extends Array<AnyArray> = [],
> = Arr extends [infer First, ...infer Rest]
  ? List.Length<Item> extends Size
    ? Chunk<Rest, Size, [First], List.Append<Items, Item>>
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
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  ) as Chunk<Arr, Size>
