import {
  expectType,
  setLightness,
  toHSLObject,
  toRGBObject,
} from '../../../_api'

describe('node - logic:custom', () => {
  test('logic:custom:colors', () => {
    const colorHSL = 'hsl(10, 10%, 10%)'
    const colorRGB = 'rgb(10, 10, 10)'

    // setLightness
    const newColor = setLightness(10, colorHSL)

    expect(newColor).toBe('hsl(10, 10%, 20%)')
    expectType<'hsl(10, 10%, 20%)'>(newColor)

    // toHSLObject
    const hslObject = toHSLObject(colorHSL)

    expect(hslObject).toEqual({
      hue: 10,
      saturation: 10,
      lightness: 10,
    })

    // toRGBObject
    const rgbObject = toRGBObject(colorRGB)

    expect(rgbObject).toEqual({
      red: 10,
      green: 10,
      blue: 10,
    })
  })
})
