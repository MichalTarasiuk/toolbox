/* eslint-disable functional/no-loop-statement -- break */
import { keyIn } from '@wren/utils'
import React from 'react'

import { isReactElement, resolve } from './helpers'

import type { Resolvable } from './helpers'
import type { ReactNode } from 'react'

type Childrens = ReturnType<typeof React['Children']['toArray']>

type SwitchProps = {
  children: ReactNode
}

type CaseProps = {
  children: ReactNode
  shouldBreak?: boolean
  condition: Resolvable<unknown>
}

type DefaultProps = {
  children: ReactNode
  shouldBreak?: boolean
}

export const Case = ({ children, condition }: CaseProps) => {
  const resolvedCondition = Boolean(resolve(condition))

  return <>{resolvedCondition && children}</>
}

export const Default = ({ children }: DefaultProps) => <>{children}</>

export const Switch = ({ children }: SwitchProps) => {
  const childrens = React.Children.toArray(children)
  const matchingChildren: Childrens = []

  for (const Child of childrens) {
    if (isReactElement(Child) && Child.type === (Case || Default)) {
      matchingChildren.push(Child)

      const shouldBreak =
        keyIn(Child.props, 'shouldBreak') && Child.props['shouldBreak']

      if (shouldBreak) {
        break
      }
    }
  }

  return <>{matchingChildren}</>
}
