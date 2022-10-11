import { isString, none } from '@bulb/utils'

export const readServerCacheKey = (propertyKey: unknown) =>
  isString(propertyKey) ? propertyKey.replace(/[\w-]+:/g, none) : none
