import {
  createAutoPercentage,
  createEventHub,
  createRange,
  expectType,
  max,
  min,
  setLightness,
  sum,
  toHSLObject,
  toRGBObject,
} from '../../_api'

describe('node - logic:custom', () => {
  test('logic:custom:factories:createAutoPercentage', () => {
    const autoPercentage = createAutoPercentage()
    const steps = [
      { name: 'init', progress: autoPercentage.percentage() },
      { name: 'modify', progress: autoPercentage.percentage() },
      { name: 'verify', progress: autoPercentage.percentage() },
      { name: 'cleanup', progress: 0 },
    ]
    let progess = 0

    steps.forEach((step) => {
      progess += Number(step.progress)
    })

    expect(progess).toBe(1)
  })

  test('logic:custom:factories:createEventHub', () => {
    const eventHub = createEventHub()
    const spy = jest.fn()

    const listener = eventHub.on('message', spy)
    eventHub.emit('message', 'Hello World!')

    expect(spy).toHaveBeenCalledWith('Hello World!')

    listener.off()
    eventHub.emit('message', 'Hello World!')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('logic:custom:factories:createRange', () => {
    const rangeFrom0To10 = createRange(0, 10)
    const rangeFrom3To6 = createRange(3, 6)
    const rangeFrom0To2 = createRange(0, 2)

    // invalid initialization
    expect(() => {
      const upper = 10

      createRange(upper + 1, upper)
    }).toThrowError()

    // invalid token
    expect(() => {
      const token = Symbol()

      rangeFrom0To10.read(token)
    }).toThrowError()

    // has
    expect(rangeFrom0To10.has(4)).toBeTruthy()
    expect(rangeFrom0To10.has(11)).toBeFalsy()

    // intersects
    expect(rangeFrom0To10.intersects(rangeFrom3To6)).toBeTruthy()
    expect(rangeFrom0To2.intersects(rangeFrom3To6)).toBeFalsy()

    // equals
    expect(rangeFrom0To10.equals(rangeFrom0To10))

    // isSuperrange
    expect(rangeFrom0To10.isSuperrange(rangeFrom3To6)).toBeTruthy()
    expect(rangeFrom3To6.isSuperrange(rangeFrom0To10)).toBeFalsy()

    // isSubrange
    expect(rangeFrom3To6.isSubrange(rangeFrom0To10)).toBeTruthy()
    expect(rangeFrom0To10.isSubrange(rangeFrom3To6)).toBeFalsy()
  })

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

  test('logic:custom:reducers', () => {
    const example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // logic:custom:reducers:min
    expect(example.reduce(min)).toBe(1)

    // logic:custom:reducers:max
    expect(example.reduce(max)).toBe(10)

    // logic:custom:reducers:sum
    expect(example.reduce(sum)).toBe(55)
  })
})
