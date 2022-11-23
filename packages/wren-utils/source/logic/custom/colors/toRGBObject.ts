import type {Number as NumberType} from '@tool/typescript';

type ToRGBObject<RGB> = RGB extends `rgb(${infer Red}, ${infer Green}, ${infer Blue})`
  ? {
      red: NumberType.ToNumber<Red>;
      green: NumberType.ToNumber<Green>;
      blue: NumberType.ToNumber<Blue>;
    }
  : never;

/**
 * Split RGB into object
 */
export const toRGBObject = <RGB extends `rgb(${number}, ${number}, ${number})`>(rgb: RGB) => {
  const [red = 0, green = 0, blue = 0] = rgb.match(/\d+/g)?.map(Number) || [];

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  return {red, green, blue} as unknown as ToRGBObject<RGB>;
};
