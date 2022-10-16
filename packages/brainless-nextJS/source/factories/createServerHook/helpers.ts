import { isString, none } from '@brainless/utils'

export const readServerCacheKey = (propertyKey: unknown) =>
  isString(propertyKey) ? propertyKey.replace(/[\w-]+:/g, none) : none
