import { fromEntries } from '@bulb/utils'

import type { ContextUnion, PropsProvider } from './createServerHookImpl'

export const composePropsProviders = async <Context extends ContextUnion>(
  propsProviders: Array<PropsProvider<Context>>,
  context: Context,
) => {
  const entries = await Promise.all(
    propsProviders.map((propsProvider): [string, unknown] => [
      propsProvider.name,
      propsProvider(context),
    ]),
  )

  return fromEntries(entries)
}
