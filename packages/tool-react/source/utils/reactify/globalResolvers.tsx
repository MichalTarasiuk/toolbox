import {keyIn, none} from '@tool/utils';
import {attributesToProps, domToReact} from 'html-react-parser';
import Image from 'next/legacy/image';
import Link from 'next/link';
import Script from 'next/script';

import {Null} from '../utils';

import {hasSizes, hasSource, isAnchorTag, isImageTag, isSameSite, isScriptTag} from './assertions';

import type {DOMNode, Element, HTMLReactParserOptions} from 'html-react-parser';
import type {AnyAttribs} from './types';
import type {Any} from '@tool/typescript';

type Resolvers = Any.AnyObject<
  {
    canUse: (element: Element) => boolean;
    use: (children: DOMNode[], attribs: AnyAttribs) => JSX.Element;
  },
  string
>;

const values = Object.values;

export const getGlobalResolvers = (options: HTMLReactParserOptions) => {
  const resolvers: Resolvers = {
    'next/link': {
      canUse: (element: Element) => isAnchorTag(element) && isSameSite(element.attribs['href'] ?? none),
      use: (children: DOMNode[], attribs: AnyAttribs) => (
        <Link href={attribs['href'] ?? none}>
          <a {...attributesToProps(attribs)}>{domToReact(children, options)}</a>
        </Link>
      ),
    },
    'next/script': {
      canUse: (element: Element) => isScriptTag(element) && keyIn(element.attribs, 'id'),
      use: (children: DOMNode[], attribs: AnyAttribs) => (
        <Script id={attribs['id']} {...attributesToProps(attribs)}>
          {domToReact(children, options)}
        </Script>
      ),
    },
    'next/image': {
      canUse: (element: Element) => isImageTag(element) && hasSizes(element.attribs),
      use: (_, attribs: AnyAttribs) => (hasSource(attribs) ? <Image {...attribs} /> : <Null />),
    },
  };

  const findOne = (element: Element) => {
    const resolver = values(resolvers).find(someResolver => someResolver.canUse(element));

    return resolver;
  };

  return {findOne};
};
