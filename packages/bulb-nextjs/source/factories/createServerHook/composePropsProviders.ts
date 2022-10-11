import { fromEntries } from '@bulb/utils'

import type { ContextUnion, ServerHook } from './createServerHookImpl'

export const composePropsProviders = async <Context extends ContextUnion>(
  serverHooks: ServerHook[],
  context: Context,
) => {
  const entries = await Promise.all(
    serverHooks.map((serverHook): [string, unknown] => {
      const propsProvider = serverHook.propsProvider

      return [propsProvider.name, propsProvider(context)]
    }),
  )

  return fromEntries(entries)
}
