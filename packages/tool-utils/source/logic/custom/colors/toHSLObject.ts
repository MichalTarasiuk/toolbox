import {type String as StringType} from '@tool/typescript';

type ToHSLObject<HSL> = HSL extends `hsl(${infer Hue}, ${infer Saturation}%, ${infer Lightness}%)`
  ? {
      hue: StringType.ToNumber<Hue>;
      saturation: StringType.ToNumber<Saturation>;
      lightness: StringType.ToNumber<Lightness>;
    }
  : never;

/**
 * Split HSL into object
 */
export const toHSLObject = <HSL extends `hsl(${number}, ${number}%, ${number}%)`>(hsl: HSL) => {
  const [hue = 0, saturation = 0, lightness = 0] = hsl.match(/\d+/g)?.map(Number) ?? [];

  return {hue, saturation, lightness} as unknown as ToHSLObject<HSL>;
};
