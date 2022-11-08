import { isString, keyIn } from '@wren/utils'

import type { ContextUnion } from './createServerHookImpl'
import type { GetServerSidePropsContext } from 'next'

const requiredKeys = ['req', 'res']

export const isServerSideContext = (
  context: ContextUnion,
): context is GetServerSidePropsContext =>
  requiredKeys.every((requiredKey) => keyIn(context, requiredKey))

export const isServerCacheKey = (
  propertyKey: PropertyKey,
): propertyKey is string =>
  isString(propertyKey) && /[\w-]+:/g.test(propertyKey)
