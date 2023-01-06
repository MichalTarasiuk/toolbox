import type {Any} from '@tool/typescript';

export const copyWithin = <AnyArray extends Any.AnyArray>(
  anyArray: AnyArray,
  ...params: Parameters<Any.AnyArray['copyWithin']>
) => [...anyArray].copyWithin(...params);

export const fill = <AnyArray extends Any.AnyArray>(anyArray: AnyArray, ...params: Parameters<Any.AnyArray['fill']>) =>
  [...anyArray].fill(...params);

export const reverse = <AnyArray extends Any.AnyArray>(anyArray: AnyArray) => [...anyArray].reverse();

export const sort = <AnyArray extends Any.AnyArray>(anyArray: AnyArray, ...params: Parameters<Any.AnyArray['sort']>) =>
  [...anyArray].sort(...params);

export const splice = <AnyArray extends Any.AnyArray>(
  anyArray: AnyArray,
  ...params: Parameters<Any.AnyArray['splice']>
) => {
  const reference = [...anyArray];

  const result = reference.splice(...params);

  return {
    reference,
    result,
  };
};

export const pop = <AnyArray extends Any.AnyArray>(anyArray: AnyArray, ...params: Parameters<Any.AnyArray['pop']>) => {
  const reference = [...anyArray];
  const result = reference.pop(...params);

  return {
    reference,
    result,
  };
};

export const push = <AnyArray extends Any.AnyArray>(
  anyArray: AnyArray,
  ...params: Parameters<Any.AnyArray['push']>
) => {
  const reference = [...anyArray];
  const result = reference.push(...params);

  return {
    reference,
    result,
  };
};

export const shift = <AnyArray extends Any.AnyArray>(
  anyArray: AnyArray,
  ...params: Parameters<Any.AnyArray['shift']>
) => {
  const reference = [...anyArray];
  const result = reference.shift(...params);

  return {
    reference,
    result,
  };
};

export const unshift = <AnyArray extends Any.AnyArray>(
  anyArray: AnyArray,
  ...params: Parameters<Any.AnyArray['unshift']>
) => {
  const reference = [...anyArray];
  const result = reference.unshift(...params);

  return {
    reference,
    result,
  };
};
