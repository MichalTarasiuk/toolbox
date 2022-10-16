import { fromEntries } from '@flame/utils'
import { v4 } from 'uuid'

import type { ContextUnion, ServerHook } from './createServerHookImpl'

export const composePropsProviders = async <Context extends ContextUnion>(
  serverHooks: ServerHook[],
  context: Context,
) => {
  const entries = await Promise.all(
    serverHooks.map((serverHook): [string, unknown] => {
      const propsProvider = serverHook.propsProvider

      return [`${v4()}:${propsProvider.name}`, propsProvider(context)]
    }),
  )

  return fromEntries(entries)
}
