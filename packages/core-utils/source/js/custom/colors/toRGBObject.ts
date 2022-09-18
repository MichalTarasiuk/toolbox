export const toRGBObject = (rgb: `rgb(${number}, ${number}, ${number})`) => {
  const [red = 0, green = 0, blue = 0] = rgb.match(/\d+/g)?.map(Number) || []

  return { red, green, blue }
}
