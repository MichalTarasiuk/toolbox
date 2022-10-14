import { isUndefined } from '@bulb/utils'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { checkSteps, generateTokens, tokenify } from './helpers'

import type { Steps } from './types'
import type { Custom } from '@bulb/typescript'
import type { ReactNode } from 'react'

type Tokenify = typeof tokenify
type TokenifiedStep = Custom.ValueOf<ReturnType<Tokenify>>

type StepperContextValue = {
  readonly step: TokenifiedStep
  back: (token?: symbol) => void
  go: (token: symbol) => void
}

export const createStepperContext = (steps: Steps) => {
  const { canWork, range } = checkSteps(steps)

  if (!canWork) {
    throw Error('stepper context: steps are invalid')
  }

  const initialStepperContext = Symbol()
  const permission = new Map<number, symbol>()
  const initialIndex = 0

  const tokens = generateTokens(steps)
  const tokenifiedSteps = tokenify(steps, tokens)

  const isValidToken = (token: symbol, index: number) => tokens[index] === token

  const stepperContext = createContext<
    StepperContextValue | typeof initialStepperContext
  >(initialStepperContext)

  const StepperProvider = ({ children }: { children: ReactNode }) => {
    const [index, setIndex] = useState(initialIndex)

    const currentStep = tokenifiedSteps[index]

    const back = useCallback((token?: symbol) => {
      if (index === range.start) {
        throw Error('stepper context: there is no step back')
      }

      const cacheToken = token ?? permission.get(index)
      const savedToken = tokens[index - 1]

      if (cacheToken === savedToken) {
        setIndex(index - 1)
      }
    }, [])

    const go = useCallback((token: symbol) => {
      if (index === range.end) {
        throw Error('stepper context: there is no step to go')
      }

      const nextIndex = index + 1

      if (isValidToken(token, index)) {
        permission.set(index, token)

        setIndex(nextIndex)
      }

      return { isCompleted: nextIndex === range.end }
    }, [])

    const value = useMemo(
      () => ({
        get step() {
          if (isUndefined(currentStep)) {
            throw Error(`stepper context: step is not deified ¯\_(ツ)_/¯`)
          }

          return currentStep
        },
        back,
        go,
      }),
      [currentStep],
    )

    return (
      <stepperContext.Provider value={value}>
        {children}
      </stepperContext.Provider>
    )
  }

  const useStepper = () => {
    const context = useContext(stepperContext)

    if (context === initialStepperContext) {
      throw new Error('useStepper must be called within a <StepperProvider />')
    }

    return context
  }

  return { StepperProvider, useStepper }
}
