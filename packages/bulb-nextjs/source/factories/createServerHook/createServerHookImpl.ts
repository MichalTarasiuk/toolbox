import { keyIn } from '@bulb/utils'

import { useServerCache } from './serverContext'

import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

export type ContextUnion = GetServerSidePropsContext | GetStaticPropsContext
export type PropsProviderType<Context extends ContextUnion = ContextUnion> = ((
  context: Context,
) => unknown) & { name: string }

type CreateServerHook = typeof createServerHook
export type ServerHook = ReturnType<CreateServerHook>

export const createServerHook = <
  Name extends string,
  PropsProvider extends PropsProviderType,
>(
  name: Name,
  propsProvider: PropsProvider,
) => {
  const useServerHook = () => {
    const serverCache = useServerCache()

    if (keyIn<typeof serverCache, Name>(serverCache, name)) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- cache[name] has props provider result
      return serverCache[name] as ReturnType<PropsProvider>
    }

    throw Error(
      `Did not find a data hook named "${name}". Ensure it was provided to composePropsProviders.`,
    )
  }

  propsProvider.name = name

  return Object.assign(useServerHook, {
    propsProvider,
  })
}
