import { createAutoPercentage } from '../../source/js/custom/custom'

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
})
