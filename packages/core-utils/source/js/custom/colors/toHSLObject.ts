// @TODO: add description
export const toHSLObject = (hsl: `hsl(${number}, ${number}, ${number})`) => {
  const [hue = 0, saturation = 0, lightness = 0] =
    hsl.match(/\d+/g)?.map(Number) || []

  return { hue, saturation, lightness }
}
