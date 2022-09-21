// @TODO: add description

export const isBrowserTabFocused = () => !document.hidden

export const elementIsFocused = (element: Element) =>
  element === document.activeElement

export const bottomIsVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight)

export const toggleFullscreen = (mode: boolean, selector: string = 'body') =>
  mode
    ? document.querySelector(selector)?.requestFullscreen()
    : document.exitFullscreen()

export const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth

export const removeElement = (selector: string) => {
  const element = document.querySelector(selector)

  if (element) {
    element.parentNode?.removeChild(element)
  }
}
