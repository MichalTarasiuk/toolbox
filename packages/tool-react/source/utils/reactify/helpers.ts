import {isClient} from '@tool/utils';
import reactIs from 'react-is';

import {isElement} from './assertions';

import type {HTMLReactParserOptions, Element as ElementType, DOMNode} from 'html-react-parser';

export const formatId = (name: string) => `id:${name}` as const;
export const formatTag = (name: string) => `tag:${name}` as const;

export const getSiteOrigin = () => {
  if (isClient()) {
    return window.location.origin;
  }

  const siteOrigin = process.env['SITE_ORIGIN'];

  if (!siteOrigin) {
    throw Error('Cannot find `SITE_ORIGIN` environment variable');
  }

  return siteOrigin;
};

type ReplaceOption = Exclude<HTMLReactParserOptions['replace'], undefined>;

export const elementsGuard = (fn: (element: ElementType) => ReturnType<ReplaceOption>) => {
  return (domNode: DOMNode) => {
    if (isElement(domNode) && reactIs.isValidElementType(domNode.tagName)) {
      const replacedDOMNode = fn(domNode);

      return replacedDOMNode;
    }

    return domNode;
  };
};
