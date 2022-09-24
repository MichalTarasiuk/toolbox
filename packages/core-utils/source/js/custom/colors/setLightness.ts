/**
 * Changes the lightness value of an hsl() color string.
 */
export const setLightness = (
  delta: number,
  hsl: `hsl(${number}, ${number}%, ${number}%)`,
) => {
  const [hue = 0, saturation = 0, lightness = 0] =
    hsl.match(/\d+/g)?.map(Number) || []

  const newLightness = Math.max(0, Math.min(100, lightness + delta))

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`
}
