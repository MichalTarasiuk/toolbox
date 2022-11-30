/**
 * Detects whether the page is being viewed on a mobile device or a desktop.
 */
export const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

/**
 * Detects the preferred language of the current user.
 */
export const detectLanguage = (defaultLang = 'en-US') =>
  navigator.language || (Array.isArray(navigator.languages) && navigator.languages[0]) || defaultLang;
