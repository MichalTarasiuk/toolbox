import {type Any} from '@tool/typescript';
import {type DetailedHTMLFactory, type FunctionComponent, type ReactHTML} from 'react';

export type TagNameUnion = keyof ReactHTML;

type RemovePrefix<TKey> = TKey extends `tag:${infer TagName}` ? TagName : never;

type InferAttributes<ReactHtmlElement> = ReactHtmlElement extends DetailedHTMLFactory<infer Attributes, HTMLElement>
  ? Attributes
  : never;

export type Resolvers = Any.AnyObject<FunctionComponent, `id:${string}`> &
  Partial<{
    [key in `tag:${TagNameUnion}`]: FunctionComponent<InferAttributes<ReactHTML[RemovePrefix<key>]>>;
  }>;

export type AnyAttribs = Any.AnyObject<string, string>;
