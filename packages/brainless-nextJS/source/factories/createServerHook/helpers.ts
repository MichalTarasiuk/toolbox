import { isString, none } from '@jupiter/utils'

export const readServerCacheKey = (propertyKey: unknown) =>
  isString(propertyKey) ? propertyKey.replace(/[\w-]+:/g, none) : none
