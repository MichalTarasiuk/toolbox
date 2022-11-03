export * from './extensions/extensions'

type FormatExtensionKey<ExtensionKey> =
  ExtensionKey extends `create${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : never

export const formatExtensionKey = <ExtensionKey extends `create${string}`>(
  extensionKey: ExtensionKey,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow
  extensionKey.replace(
    /create(\w)(\w+)/g,
    (_: unknown, a: string, b: string) => a.toLowerCase() + b,
  ) as FormatExtensionKey<ExtensionKey>
