import { isString, keyIn, isSameOrigin } from '@wren/utils'
import { DOMNode, Element } from 'html-react-parser'

import type { AnyAttribs } from './types'
import type { Element as ElementType } from 'html-react-parser'
import { getSiteOrigin } from './helpers'

export const isElement = (domNode: DOMNode): domNode is Element =>
  'attribs' in domNode

export const hasId = (
  element: ElementType,
): element is ElementType & { attribs: { id: string } } =>
  'id' in element.attribs

export const hasSource = (attribs: AnyAttribs): attribs is { src: string } =>
  keyIn(attribs, 'src') && isString(attribs.src)

export const hasSizes = (attribs: AnyAttribs): attribs is { src: string } =>
  keyIn(attribs, 'width') &&
  keyIn(attribs, 'height') &&
  isString(attribs.width) &&
  isString(attribs.height)

export const isAnchorTag = (element: ElementType) =>
  element.tagName === 'a' && keyIn(element.attribs, 'href')

export const isImageTag = (element: ElementType) =>
  element.tagName === 'img' && keyIn(element.attribs, 'src')

export const isScriptTag = (element: ElementType) =>
  element.tagName === 'script'

export const isSameSite = (destinationOrigin: string) => {
  const sourceOrigin = getSiteOrigin()

  if (sourceOrigin) {
    return isSameOrigin(sourceOrigin, destinationOrigin)
  }

  return false
}
