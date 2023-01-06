/* eslint-disable @typescript-eslint/no-unused-vars */
import {keyIn} from '@tool/utils';
import parse, {attributesToProps, domToReact} from 'html-react-parser';

import {hasResolveAttribute, isValidName} from './assertions';
import {getGlobalResolvers} from './globalResolvers';
import {elementsGuard, formatResolveAttribute, formatTag} from './helpers';
import {resolveAttributeName} from './consts';

import type {Custom} from '@tool/typescript';
import type {HTMLReactParserOptions} from 'html-react-parser';
import type {Resolvers} from './types';

export const reactify = (html: string, customResolvers?: Resolvers) => {
  const getCustomResolver = (name: string): Custom.ValueOf<Resolvers> | null =>
    customResolvers && keyIn(customResolvers, name) && isValidName(name) ? customResolvers[name] : null;

  const options: HTMLReactParserOptions = {
    replace: elementsGuard(element => {
      const {children, attribs} = element;

      const name = hasResolveAttribute(element.attribs)
        ? formatResolveAttribute(element.attribs.resolve)
        : formatTag(element.tagName);
      const CustomResolver = getCustomResolver(name);

      if (CustomResolver) {
        const {[resolveAttributeName]: _, ...restAttribs} = element.attribs;

        return <CustomResolver {...attributesToProps(restAttribs)}>{domToReact(children, options)}</CustomResolver>;
      }

      const globalResolver = getGlobalResolvers(options).findOne(element);

      return globalResolver ? globalResolver.use(children, attribs) : element;
    }),
  };

  return parse(html, options);
};
