import { isString, none } from '@flame/utils'

export const readServerCacheKey = (propertyKey: unknown) =>
  isString(propertyKey) ? propertyKey.replace(/[\w-]+:/g, none) : none
