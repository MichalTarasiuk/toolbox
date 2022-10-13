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
}

export const createStepperContext = (steps: Steps) => {
  const { canWork } = checkSteps(steps)

  if (!canWork) {
    throw Error('stepper context: steps are invalid')
  }

  const initialStepperContext = Symbol()
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

    const back = useCallback(() => {}, [])

    const go = useCallback((token: symbol) => {
      if (isValidToken(token, index)) {
        setIndex(index + 1)
      }
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
      [],
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
