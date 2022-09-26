import type { DetailedHTMLFactory, FunctionComponent, ReactHTML } from 'react'

type TagName = keyof ReactHTML

type RemovePrefix<TKey> = TKey extends `tag:${infer TagName}` ? TagName : never

type InferAttributes<TReactHtmlElement> =
  TReactHtmlElement extends DetailedHTMLFactory<infer Attributes, HTMLElement>
    ? Attributes
    : never

export type Resolvers = Partial<{
  [key in `tag:${TagName}`]: FunctionComponent<
    InferAttributes<ReactHTML[RemovePrefix<key>]>
  >
}> & {
  [id: `id:${string}`]: FunctionComponent
}

export type ParserConfig = {
  resolvers?: Resolvers
}

export type AnyAttribs = {
  [x: string]: string
}
