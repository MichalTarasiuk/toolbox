import { isClient } from '../../core-utils'

/**
 * Check that device has IOS operating system.
 * */
export const isIOS = () =>
  isClient()
    ? // @TODO type MSStream prop
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    : false
