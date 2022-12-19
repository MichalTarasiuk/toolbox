import type {resolveAttributeName} from './consts';
import type {Any} from '@tool/typescript';
import type {DetailedHTMLFactory, FunctionComponent, ReactHTML} from 'react';

export type ResolveAttributeName = typeof resolveAttributeName;

export type TagNameUnion = keyof ReactHTML;

type RemovePrefix<Key> = Key extends `tag:${infer TagName}` ? TagName : never;

type InferAttributes<ReactHtmlElement> = ReactHtmlElement extends DetailedHTMLFactory<infer Attributes, HTMLElement>
  ? Attributes
  : never;

export type Resolvers = Any.AnyObject<FunctionComponent, `${ResolveAttributeName}:${string}`> &
  Partial<{
    [key in `tag:${TagNameUnion}`]: FunctionComponent<InferAttributes<ReactHTML[RemovePrefix<key>]>>;
  }>;

export type AnyAttribs = Any.AnyObject<string, string>;
