import type {Number as NumberType} from '@wren/typescript';

type ToHSLObject<HSL> = HSL extends `hsl(${infer Hue}, ${infer Saturation}%, ${infer Lightness}%)`
  ? {
      hue: NumberType.ToNumber<Hue>;
      saturation: NumberType.ToNumber<Saturation>;
      lightness: NumberType.ToNumber<Lightness>;
    }
  : never;

/**
 * Split HSL into object
 */
export const toHSLObject = <HSL extends `hsl(${number}, ${number}%, ${number}%)`>(hsl: HSL) => {
  const [hue = 0, saturation = 0, lightness = 0] = hsl.match(/\d+/g)?.map(Number) || [];

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  return {hue, saturation, lightness} as unknown as ToHSLObject<HSL>;
};
