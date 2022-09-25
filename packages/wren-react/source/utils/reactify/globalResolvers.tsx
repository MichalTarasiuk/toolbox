import { attributesToProps, domToReact } from 'html-react-parser'
import Link from 'next/link'
import Script from 'next/script'

import { isAnchorTag, isSameOrigin, isScriptTag } from './helpers'

import type {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser'
import type { Attribs } from './types'
import React from 'react'

const values = Object.values

export const getGlobalResolvers = (options: HTMLReactParserOptions) => {
  const resolvers = {
    'next/link': {
      canUse: (element: Element) =>
        isAnchorTag(element) && isSameOrigin(element.attribs.href),
      use: (children: DOMNode[], attribs: Attribs) => (
        <Link href={attribs.href}>
          <a {...attributesToProps(attribs)}>{domToReact(children, options)}</a>
        </Link>
      ),
    },
    'next/script': {
      canUse: (element: Element) =>
        isScriptTag(element) && 'id' in element.attribs,
      use: (children: DOMNode[], attribs: Attribs & { id?: string }) => (
        <Script id={attribs.id} {...attributesToProps(attribs)}>
          {domToReact(children, options)}
        </Script>
      ),
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
