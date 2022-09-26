/**
 * Checks if the browser tab of the page is focused.
 */
export const isBrowserTabFocused = () => !document.hidden

/**
 * Checks if the given element is focused.
 */
export const elementIsFocused = (element: Element) =>
  element === document.activeElement

/**
 * Checks if the bottom of the page is visible.
 */
export const bottomIsVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight)

/**
 * Opens or closes an element in fullscreen mode.
 */
export const toggleFullscreen = (mode: boolean, selector: string = 'body') =>
  mode
    ? document.querySelector(selector)?.requestFullscreen()
    : document.exitFullscreen()

/**
 * Calculates the width of the window's vertical scrollbar.
 */
export const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth

/**
 * Removes an element from the DOM.
 */
export const removeElement = (selector: string) => {
  const element = document.querySelector(selector)

  if (element) {
    element.parentNode?.removeChild(element)
  }
}
