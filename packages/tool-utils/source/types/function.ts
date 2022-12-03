import {type Any, type Custom} from '@tool/typescript';

export const flatMap = <AnyArray extends Any.AnyArray, ReturnType>(
  anyArray: Custom.Narrow<AnyArray>,
  fn: (item: AnyArray[number]) => Custom.Narrow<ReturnType>,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow down
) => anyArray.flatMap(fn) as Array<Exclude<ReturnType, []>>;
