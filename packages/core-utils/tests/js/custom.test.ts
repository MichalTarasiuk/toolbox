import {
  createAutoPercentage,
  createEventHub,
  min,
  max,
  sum,
  toHSLObject,
  toRGBObject,
  setLightness,
} from '../../source/js/custom/custom'

describe('js:custom', () => {
  it('js:custom:factories:createAutoPercentage', () => {
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

  it('js:custom:factories:createEventHub', () => {
    const eventHub = createEventHub()
    const spy = jest.fn()

    const listener = eventHub.on('message', spy)
    eventHub.emit('message', 'Hello World!')

    expect(spy).toHaveBeenCalledWith('Hello World!')

    listener.off()
    eventHub.emit('message', 'Hello World!')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('js:custom:reducers', () => {
    const example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // js:custom:reducers:min
    expect(example.reduce(min)).toBe(1)

    // js:custom:reducers:max
    expect(example.reduce(max)).toBe(10)

    // js:custom:reducers:sum
    expect(example.reduce(sum)).toBe(55)
  })

  it('js:custom:colors', () => {
    // js:custom:colors:setLightness
    expect(setLightness(10, 'hsl(330, 50%, 50%)')).toBe('hsl(330, 50%, 60%)')
    expect(setLightness(-10, 'hsl(330, 50%, 50%)')).toBe('hsl(330, 50%, 40%)')

    // js:custom:colors:toHSLObject
    expect(toHSLObject('hsl(50, 10%, 10%)')).toEqual({
      hue: 50,
      saturation: 10,
      lightness: 10,
    })

    // js:custom:colors:toRGBObject
    expect(toRGBObject('rgb(255, 12, 0)')).toEqual({
      red: 255,
      green: 12,
      blue: 0,
    })
  })
})
