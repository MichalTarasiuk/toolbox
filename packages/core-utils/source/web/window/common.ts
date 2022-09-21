// @TODO: add description for each utility and typings
import { isClient } from '../../../core-utils'

export const supportsTouchEvents = () =>
  isClient() && window && 'ontouchstart' in window

export const prefersDarkColorScheme = () =>
  isClient() && window.matchMedia('(prefers-color-scheme: dark)').matches

export const prefersLightColorScheme = () =>
  isClient() && window.matchMedia('(prefers-color-scheme: light)').matches

/**
 * Check that device has IOS operating system.
 * */
export const isIOS = () =>
  isClient()
    ? // @TODO type MSStream prop
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    : false

export const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'Mobile'
    : 'Desktop'

export const detectLanguage = (defaultLang = 'en-US') =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang
