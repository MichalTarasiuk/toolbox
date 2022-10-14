import { entries, fromEntries, keyIn, max, min, objectKeys } from '@bulb/utils'

import type { Steps, Tokens } from './types'

export const generateTokens = (steps: Steps) =>
  fromEntries(entries(steps).map(([key]) => [key, Symbol()]))

export const tokenify = (steps: Steps, tokens: Tokens) =>
  fromEntries(
    entries(steps).map(
      <Key extends number>([key, { canGo: canGoImpl, ...step }]: [
        Key,
        Steps[keyof Steps],
      ]) => {
        const canGo = (...params: Parameters<typeof canGoImpl>) =>
          canGoImpl(...params) && keyIn(tokens, key) ? tokens[key] : undefined

        const newStep = { canGo, ...step }

        return [key, newStep]
      },
    ),
  )

export const checkSteps = (steps: Steps) => {
  const keys = objectKeys(steps).map(Number)

  const range = {
    start: keys.reduce(min),
    end: keys.reduce(max),
  }

  const requiredKeys = Array.from(
    { length: range.end },
    (_, index) => index + range.start,
  )
  const canWork = requiredKeys.every((requiredKey) =>
    keys.includes(requiredKey),
  )

  return {
    canWork,
    range,
  }
}
