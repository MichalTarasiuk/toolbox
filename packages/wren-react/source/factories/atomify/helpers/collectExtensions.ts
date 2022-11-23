import {objectKeys} from '@wren/utils';

import type {AtomInitialize} from '../types';

type FormatExtensionKey<ExtensionKey> = ExtensionKey extends `create${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : never;

type CollectExtensions = {
  -readonly [ExtenstionKey in keyof Extenstions as FormatExtensionKey<ExtenstionKey>]: ReturnType<
    Extenstions[ExtenstionKey]
  >;
};

type Extenstions = typeof import('../extensions/extensions');

const formatExtensionKey = <ExtensionKey extends `create${string}`>(extensionKey: ExtensionKey) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow
  extensionKey.replace(
    /create(\w)(\w+)/g,
    (_: unknown, a: string, b: string) => a.toLowerCase() + b,
  ) as FormatExtensionKey<ExtensionKey>;

export const collectExtensions = (extenstions: Extenstions, atom: AtomInitialize) =>
  objectKeys(extenstions).reduce((collector, extenstionKey) => {
    collector[formatExtensionKey(extenstionKey)] = extenstions[extenstionKey](atom);

    return collector;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- define type of collector
  }, {} as CollectExtensions);
