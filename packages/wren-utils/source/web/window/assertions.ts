// @TODO: add description for each utility and typings
import { isClient } from '../../../_api'

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
