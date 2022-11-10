import { defer } from '@wren/utils'

import type { Any } from '@wren/typescript'

export * from './areHookInputsEqual'
export * from './reactify/reactify'
export * from './wrapContext'
export * from './traverseFiber'
export * from './contextify'
export * from './suspensify'

export const Null = () => <></>

export const blockBatching = (fn: Any.UnknownFunction) => defer(fn)
