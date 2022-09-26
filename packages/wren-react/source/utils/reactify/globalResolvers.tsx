import { keyIn } from '@wren/utils'
import { attributesToProps, domToReact } from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'

import {
  hasSizes,
  hasSource,
  isAnchorTag,
  isImageTag,
  isSameSite,
  isScriptTag,
} from './assertions'
import { Null } from './consts'

import type { AnyAttribs } from './types'
import type {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser'

const values = Object.values

type Resolvers = {
  readonly [resolver: string]: {
    readonly canUse: (element: Element) => boolean
    readonly use: (
      children: readonly DOMNode[],
      attribs: AnyAttribs,
    ) => JSX.Element
  }
}

export const getGlobalResolvers = (options: HTMLReactParserOptions) => {
  const resolvers: Resolvers = {
    'next/link': {
      canUse: (element: Element) =>
        isAnchorTag(element) && isSameSite(element.attribs.href),
      use: (children: readonly DOMNode[], attribs: AnyAttribs) => (
        <Link href={attribs.href}>
          <a {...attributesToProps(attribs)}>{domToReact(children, options)}</a>
        </Link>
      ),
    },
    'next/script': {
      canUse: (element: Element) =>
        isScriptTag(element) && keyIn(element.attribs, 'id'),
      use: (
        children: readonly DOMNode[],
        attribs: AnyAttribs & Partial<{ readonly id: string }>,
      ) => (
        <Script id={attribs.id} {...attributesToProps(attribs)}>
          {domToReact(children, options)}
        </Script>
      ),
    },
    'next/image': {
      canUse: (element: Element) =>
        isImageTag(element) && hasSizes(element.attribs),
      use: (
        _,
        attribs: AnyAttribs &
          Partial<{
            readonly src: string
            readonly width: string
            readonly height: string
          }>,
      ) => (hasSource(attribs) ? <Image {...attribs} /> : <Null />),
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
