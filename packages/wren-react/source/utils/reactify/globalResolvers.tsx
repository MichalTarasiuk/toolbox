import { keyIn, none } from '@wren/utils'
import { attributesToProps, domToReact } from 'html-react-parser'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'

import { Null } from '../utils'

import {
  hasSizes,
  hasSource,
  isAnchorTag,
  isImageTag,
  isSameSite,
  isScriptTag,
} from './assertions'

import type { AnyAttribs } from './types'
import type {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser'

type Resolvers = {
  [resolver: string]: {
    canUse: (element: Element) => boolean
    use: (children: DOMNode[], attribs: AnyAttribs) => JSX.Element
  }
}

const values = Object.values

export const getGlobalResolvers = (options: HTMLReactParserOptions) => {
  const resolvers: Resolvers = {
    'next/link': {
      canUse: (element: Element) =>
        isAnchorTag(element) && isSameSite(element.attribs['href'] ?? none),
      use: (children: DOMNode[], attribs: AnyAttribs) => (
        <Link href={attribs['href'] ?? none}>
          <a {...attributesToProps(attribs)}>{domToReact(children, options)}</a>
        </Link>
      ),
    },
    'next/script': {
      canUse: (element: Element) =>
        isScriptTag(element) && keyIn(element.attribs, 'id'),
      use: (children: DOMNode[], attribs: AnyAttribs) => (
        <Script id={attribs['id']} {...attributesToProps(attribs)}>
          {domToReact(children, options)}
        </Script>
      ),
    },
    'next/image': {
      canUse: (element: Element) =>
        isImageTag(element) && hasSizes(element.attribs),
      use: (_, attribs: AnyAttribs) =>
        hasSource(attribs) ? <Image {...attribs} /> : <Null />,
    },
  }

  const findOne = (element: Element) => {
    const resolver = values(resolvers).find((resolver) =>
      resolver.canUse(element),
    )

    return resolver
  }

  return { findOne }
}
