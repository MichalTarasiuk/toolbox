import {type Number as NumberType} from 'ts-toolbelt';

type SetLightness<
  Delta extends number,
  HSL,
> = HSL extends `hsl(${infer Hue}, ${infer Saturation}%, ${infer Lightness extends number}%)`
  ? `hsl(${Hue}, ${Saturation}%, ${NumberType.Add<Lightness, Delta>}%)`
  : never;

/**
 * Changes the lightness value of an hsl() color string.
 */
export const setLightness = <Delta extends number, HSL extends `hsl(${number}, ${number}%, ${number}%)`>(
  delta: Delta,
  hsl: HSL,
) => {
  const [hue = 0, saturation = 0, lightness = 0] = hsl.match(/\d+/g)?.map(Number) ?? [];

  const newLightness = Math.max(0, Math.min(100, lightness + delta));

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)` as SetLightness<Delta, HSL>;
};
