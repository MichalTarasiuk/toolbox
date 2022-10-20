import { isClient } from '@jupiter/utils'

import { isElement } from './assertions'

import type {
  HTMLReactParserOptions,
  Element as ElementType,
  DOMNode,
} from 'html-react-parser'

export const formatId = (name: string) => `id:${name}` as const
export const formatTag = (name: string) => `tag:${name}` as const

export const getSiteOrigin = () => {
  if (isClient()) {
    return window.location.origin
  }

  const siteOrigin = process.env['SITE_ORIGIN']

  if (!siteOrigin) {
    throw Error('Cannot find `SITE_ORIGIN` environment variable')
  }

  return siteOrigin
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
