import {isString, keyIn, isSameOrigin} from '@tool/utils';

import {getSiteOrigin} from './helpers';
import {resolveAttributeName} from './consts';

import type {DOMNode, Element, Element as ElementType} from 'html-react-parser';
import type {AnyAttribs, TagNameUnion} from './types';

export const isElement = (domNode: DOMNode): domNode is Element => 'attribs' in domNode;

export const hasResolveAttribute = (attribs: AnyAttribs): attribs is {resolve: string} =>
  resolveAttributeName in attribs && isString(attribs[resolveAttributeName]);

export const hasSource = (attribs: AnyAttribs): attribs is {src: string} =>
  keyIn(attribs, 'src') && isString(attribs.src);

export const hasSizes = (attribs: AnyAttribs): attribs is {src: string} =>
  keyIn(attribs, 'width') && isString(attribs.width) && keyIn(attribs, 'height') && isString(attribs.height);

export const isAnchorTag = (element: ElementType) => element.tagName === 'a' && keyIn(element.attribs, 'href');

export const isImageTag = (element: ElementType) => element.tagName === 'img' && keyIn(element.attribs, 'src');

export const isScriptTag = (element: ElementType) => element.tagName === 'script';

export const isSameSite = (destinationOrigin: string) => {
  const sourceOrigin = getSiteOrigin();

  if (sourceOrigin) {
    return isSameOrigin(sourceOrigin, destinationOrigin);
  }

  return false;
};

export const isValidName = (name: string): name is `resolve:${string}` | `tag:${TagNameUnion}` =>
  name.startsWith(`${resolveAttributeName}:`) || name.startsWith('tag:');
