import {type Any, type Custom} from '@tool/typescript';

const flatten = (array: Any.AnyArray) => {
  const initial: Any.AnyArray = [];

  return initial.concat(...array);
};

export const asyncFlatMap = async <Array extends Any.AnyArray, Result>(
  array: Custom.Narrow<Array>,
  asyncFn: (value: Array[number]) => Promise<Result>,
) => flatten(await Promise.all(array.map(asyncFn)));
