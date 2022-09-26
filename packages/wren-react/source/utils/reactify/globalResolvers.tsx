import { attributesToProps, domToReact } from 'html-react-parser'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { Null } from './consts'
import {
  hasSizes,
  hasSource,
  isAnchorTag,
  isImageTag,
  isSameSite,
  isScriptTag,
} from './assertions'
import type {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser'
import type { AnyAttribs } from './types'
import React from 'react'
import { keyIn } from '@wren/utils'

const values = Object.values

type Resolvers = {
  [resolver: string]: {
    canUse: (element: Element) => boolean
    use: (children: DOMNode[], attribs: AnyAttribs) => JSX.Element
  }
}

export const getGlobalResolvers = (options: HTMLReactParserOptions) => {
  const resolvers: Resolvers = {
    'next/link': {
      canUse: (element: Element) =>
        isAnchorTag(element) && isSameSite(element.attribs.href),
      use: (children: DOMNode[], attribs: AnyAttribs) => (
        <Link href={attribs.href}>
          <a {...attributesToProps(attribs)}>{domToReact(children, options)}</a>
        </Link>
      ),
    },
    'next/script': {
      canUse: (element: Element) =>
        isScriptTag(element) && keyIn(element.attribs, 'id'),
      use: (
        children: DOMNode[],
        attribs: AnyAttribs & Partial<{ id: string }>,
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
          Partial<{ src: string; width: string; height: string }>,
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
