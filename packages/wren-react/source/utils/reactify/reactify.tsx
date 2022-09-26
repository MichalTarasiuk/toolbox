import { keyIn } from '@wren/utils'
import parse, { attributesToProps, domToReact } from 'html-react-parser'

import { getGlobalResolvers } from './globalResolvers'
import { hasId } from './assertions'
import { elementsGuard, formatId, formatTag } from './helpers'

import type { Resolvers } from './types'
import type { HTMLReactParserOptions } from 'html-react-parser'
import React from 'react'

export const reactify = (html: string, customResolvers?: Resolvers) => {
  const getCustomResolver = (name: string): Resolvers[keyof Resolvers] | null =>
    customResolvers && keyIn(customResolvers, name)
      ? customResolvers[name]
      : null

  const options: HTMLReactParserOptions = {
    replace: elementsGuard((element) => {
      const { children, attribs } = element

      const name = hasId(element)
        ? formatId(element.attribs.id)
        : formatTag(element.tagName)

      const CustomResolver = getCustomResolver(name)

      if (CustomResolver) {
        return (
          <CustomResolver {...attributesToProps(attribs)}>
            {domToReact(children, options)}
          </CustomResolver>
        )
      }

      const globalResolver = getGlobalResolvers(options).findOne(element)

      return globalResolver ? globalResolver.use(children, attribs) : element
    }),
  }

  return parse(html, options)
}
