import {keyIn} from '@tool/utils';
import parse, {attributesToProps, domToReact} from 'html-react-parser';

import {hasId, isValidName} from './assertions';
import {getGlobalResolvers} from './globalResolvers';
import {elementsGuard, formatId, formatTag} from './helpers';

import type {Resolvers} from './types';
import type {HTMLReactParserOptions} from 'html-react-parser';

export const reactify = (html: string, customResolvers?: Resolvers) => {
  const getCustomResolver = (name: string): Resolvers[keyof Resolvers] | null =>
    customResolvers && keyIn(customResolvers, name) && isValidName(name) ? customResolvers[name] : null;

  const options: HTMLReactParserOptions = {
    replace: elementsGuard(element => {
      const {children, attribs} = element;

      const name = hasId(element.attribs) ? formatId(element.attribs.id) : formatTag(element.tagName);
      const CustomResolver = getCustomResolver(name);

      if (CustomResolver) {
        return <CustomResolver {...attributesToProps(attribs)}>{domToReact(children, options)}</CustomResolver>;
      }

      const globalResolver = getGlobalResolvers(options).findOne(element);

      return globalResolver ? globalResolver.use(children, attribs) : element;
    }),
  };

  return parse(html, options);
};
