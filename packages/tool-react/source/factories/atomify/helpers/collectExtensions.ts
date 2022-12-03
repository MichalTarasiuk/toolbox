import {objectKeys} from '@tool/utils';

import {type AtomInitialize} from '../types';

type Extenstions = typeof import('../extensions/extensions');

type CollectExtensions = {
  -readonly [ExtenstionKey in keyof Extenstions as FormatExtensionKey<ExtenstionKey>]: ReturnType<
    Extenstions[ExtenstionKey]
  >;
};

type FormatExtensionKey<ExtensionKey> = ExtensionKey extends `create${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : never;

const formatExtensionKey = <ExtensionKey extends `create${string}`>(extensionKey: ExtensionKey) =>
  extensionKey.replace(
    /create(\w)(\w+)/g,
    (_: unknown, a: string, b: string) => a.toLowerCase() + b,
  ) as FormatExtensionKey<ExtensionKey>;

export const collectExtensions = (extenstions: Extenstions, atom: AtomInitialize) =>
  objectKeys(extenstions).reduce((collector, extenstionKey) => {
    collector[formatExtensionKey(extenstionKey)] = extenstions[extenstionKey](atom);

    return collector;
  }, {} as CollectExtensions);
