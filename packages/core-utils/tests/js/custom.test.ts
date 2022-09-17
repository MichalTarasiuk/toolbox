import {
  createAutoPercentage,
  not,
  thunkify,
} from '../../source/js/custom/custom'

describe('js:custom', () => {
  it('js:custom:factories', () => {
    // js:custom:factories:createAutoPercentage
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

  it('js:custom:higherOrder', () => {
    // js:custom:higherOrder:not
    expect([0, true, [], {}, ''].filter(not(Boolean))).toEqual([0, ''])

    // js:custom:higherOrder:thunkify
    const thunk = thunkify((a: number, b: number) => a + b)

    expect(thunk(1, 2)).toBe(3)
    expect(thunk(3, 4))
  })
})
