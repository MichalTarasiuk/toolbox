// @TODO: add description for each utility and typings
import { isClient } from '../../../_api'

/**
 * Checks if touch events are supported.
 */
export const supportsTouchEvents = () =>
  isClient() && window && 'ontouchstart' in window

/**
 * Checks if the user color scheme preference is dark.
 */
export const prefersDarkColorScheme = () =>
  isClient() && window.matchMedia('(prefers-color-scheme: dark)').matches

/**
 * Checks if the user color scheme preference is light.
 */
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

/**
 * Detects whether the page is being viewed on a mobile device or a desktop.
 */
export const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'Mobile'
    : 'Desktop'

/**
 * Detects the preferred language of the current user.
 */
export const detectLanguage = (defaultLang = 'en-US') =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang
