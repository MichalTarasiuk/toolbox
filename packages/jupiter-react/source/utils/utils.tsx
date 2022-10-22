import { defer } from '@jupiter/utils'
import React from 'react'

import type { Any } from '@jupiter/typescript'

export * from './areHookInputsEqual'
export * from './reactify/reactify'
export * from './wrapContext'
export * from './traverseFiber'

export const Null = () => <></>

export const blockBatching = (fn: Any.UnknownFunction) => defer(fn)
