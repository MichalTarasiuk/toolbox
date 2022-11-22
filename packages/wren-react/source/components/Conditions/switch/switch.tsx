/* eslint-disable functional/no-loop-statement -- break */
import React from 'react'

import { isReactElement } from '../helpers'

import { isCase, isDefault, isTruthy } from './assertions'
import { useReach } from './hooks'

import type { SwitchProps, Childrens } from './types'
import type { ReactElement } from 'react'

export const Switch = ({ children }: SwitchProps) => {
  const reach = useReach(true)

  const childrens = React.Children.toArray(children)
  const selectedChildrens: Childrens = []

  const pushToSelected = (reactElement: ReactElement) => {
    if (isDefault(reactElement)) {
      reach.stop()
    }

    selectedChildrens.push(reactElement)
  }

  for (const Child of childrens) {
    if (isReactElement(Child) && (isCase(Child) || isDefault(Child))) {
      const canPush = isTruthy(Child) || reach.done

      if (canPush) {
        pushToSelected(Child)
      }

      if (canPush && Child.props['shouldBreak']) {
        break
      }

      reach.current = isDefault(Child)
    }
  }

  return <>{selectedChildrens}</>
}
