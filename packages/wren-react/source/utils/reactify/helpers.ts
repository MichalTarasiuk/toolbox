import { isClient, isString } from '@wren/utils'
import { DOMNode, Element } from 'html-react-parser'

import type {
  Element as ElementType,
  HTMLReactParserOptions,
} from 'html-react-parser'

const getSiteUrl = () => {
  if (isClient()) {
    return window.location.origin
  }

  return process.env.SITE_URL
}

export const isElement = (domNode: DOMNode): domNode is Element =>
  'attribs' in domNode

export const hasId = (
  element: ElementType,
): element is ElementType & { attribs: { id: string } } =>
  'id' in element.attribs

export const hasHref = (element: Element) => 'href' in element.attribs

export const isAnchorTag = (element: ElementType) =>
  element.tagName === 'a' && hasHref(element)

export const isScriptTag = (element: ElementType) =>
  element.tagName === 'script'

export const isSameOrigin = (destination: string) => {
  const siteUrl = getSiteUrl()

  if (isString(siteUrl)) {
    try {
      const localURL = new URL(siteUrl)
      const destinationURL = new URL(destination)

      return (
        localURL.protocol === destinationURL.protocol &&
        localURL.host === destinationURL.host
      )
    } catch {
      // throw error when destination is path

      return true
    }
  }

  return false
}

type ReplaceOption = Exclude<HTMLReactParserOptions['replace'], undefined>

export const elementsGuard =
  (callback: (element: ElementType) => ReturnType<ReplaceOption>) =>
  (domNode: DOMNode) => {
    if (isElement(domNode)) {
      const replacedDOMNode = callback(domNode)

      return replacedDOMNode
    }

    return domNode
  }

export const formatId = (name: string) => `id:${name}` as const
export const formatTag = (name: string) => `tag:${name}` as const
