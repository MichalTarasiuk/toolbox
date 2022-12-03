import {type String as StringType} from '@tool/typescript';

type ToRGBObject<RGB> = RGB extends `rgb(${infer Red}, ${infer Green}, ${infer Blue})`
  ? {
      red: StringType.ToNumber<Red>;
      green: StringType.ToNumber<Green>;
      blue: StringType.ToNumber<Blue>;
    }
  : never;

/**
 * Split RGB into object
 */
export const toRGBObject = <RGB extends `rgb(${number}, ${number}, ${number})`>(rgb: RGB) => {
  const [red = 0, green = 0, blue = 0] = rgb.match(/\d+/g)?.map(Number) || [];

  return {red, green, blue} as unknown as ToRGBObject<RGB>;
};
