import type { Any } from '../../../../jupiter-typescript/_api'
import type { generateTokens } from './helpers'

export type Steps = Any.AnyObject<
  { name: string; canGo: (...params: unknown[]) => boolean },
  number
>

export type Tokens = ReturnType<typeof generateTokens>
