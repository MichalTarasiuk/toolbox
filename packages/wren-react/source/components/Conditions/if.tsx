import React from 'react'

import { Else } from './conditions'
import { isReactElement, resolve } from './helpers'

import type { ReactNode } from 'react'

type IfProps = {
  condition: boolean | (() => boolean)
  children: ReactNode
}

export const If = ({ condition, children }: IfProps) => {
  const resolvedCondition = resolve(condition)

  return (
    <>
      {React.Children.toArray(children)
        .filter(isReactElement)
        .find(
          (reactElement) => (reactElement.type !== Else) !== !resolvedCondition,
        ) ?? null}
    </>
  )
}
