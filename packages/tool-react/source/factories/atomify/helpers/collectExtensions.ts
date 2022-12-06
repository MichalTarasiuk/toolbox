import {objectKeys} from '@tool/utils';

import type {Any, Custom} from '@tool/typescript';
import type {AtomInitialize} from '../types';

type Extenstions = typeof import('../extensions/extensions');
type ExtensionsKeys = Extract<keyof Extenstions, `create${string}`>;

type CollectedExtensions = {
  -readonly [ExtenstionKey in ExtensionsKeys as FormatExtensionKey<ExtenstionKey>]: ReturnType<
    Extenstions[ExtenstionKey]
  >;
};
type UnknownCollectedExtensions = Any.AnyObject<Custom.ValueOf<CollectedExtensions>, `${string}With${string}`>;

type FormatExtensionKey<ExtensionKey> = ExtensionKey extends `create${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : never;

const formatExtensionKey = <ExtensionKey extends `create${string}`>(extensionKey: ExtensionKey) =>
  extensionKey.replace(
    /create(\w)(\w+)/g,
    (_: unknown, a: string, b: string) => a.toLowerCase() + b,
  ) as FormatExtensionKey<ExtensionKey>;

const isExtensionProp = (prop: string): prop is `create${string}` => prop.startsWith('create');

export const collectExtensions = (extenstions: Extenstions, atom: AtomInitialize) =>
  objectKeys(extenstions).reduce((collector, extenstionKey) => {
    if (isExtensionProp(extenstionKey)) {
      collector[formatExtensionKey(extenstionKey)] = extenstions[extenstionKey](atom);
    }

    return collector;
  }, {} as UnknownCollectedExtensions) as CollectedExtensions;
