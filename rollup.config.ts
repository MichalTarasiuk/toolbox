import commonJsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import stripPlugin from '@rollup/plugin-strip'
import typescriptPlugin from '@rollup/plugin-typescript'
import { isObject, isString, keyIn, none } from '@wren/utils'

import type { RollupOptions } from 'rollup'

type Reference = { path: string }

type Formats = typeof formats

type FormatMapper = typeof formatMapper
type FormatMapperKeys = keyof FormatMapper
type FormatMapperValues = FormatMapper[FormatMapperKeys]

const outputFile = '_api.ts'
const outputDirectory = 'build'

const formats = ['cjs', 'es'] as const
const formatMapper = {
  es: 'import',
  cjs: 'require',
  umd: 'browser',
} as const

const basename = (path: string) => {
  const regExpMatchArray = path.match(/[^\\/]+?(\.\w+$)/)

  return regExpMatchArray ? regExpMatchArray[0] : none
}

const canBundlePacakge = async (reference: Reference) => {
  const packageJSON = await import(`./${reference.path}/package.json`)

  return (
    isObject(packageJSON) &&
    (keyIn(packageJSON, 'build') ? packageJSON.build : true)
  )
}

const readCompilerOptions = (tsconfig: unknown) => {
  if (
    isObject(tsconfig) &&
    keyIn(tsconfig, 'compilerOptions') &&
    isObject(tsconfig.compilerOptions)
  ) {
    return tsconfig.compilerOptions
  }

  return {}
}

const hasValidEntryFileName = <Key extends FormatMapperValues>(
  packageJSON: unknown,
  key: Key,
): packageJSON is { exports: Record<Key, string> } => {
  const hasExportsProp = isObject(packageJSON) && keyIn(packageJSON, 'exports')
  const hasValidKey =
    hasExportsProp &&
    isObject(packageJSON['exports']) &&
    keyIn(packageJSON['exports'], key) &&
    isString(packageJSON['exports'][key])

  return hasValidKey
}

const readEntryFileNames = (packageJSON: unknown, format: Formats[number]) => {
  const key = formatMapper[format]

  if (hasValidEntryFileName(packageJSON, key)) {
    const path = packageJSON.exports[key]

    return basename(path)
  }

  throw Error(`can't infer entryFileNames prop`)
}

const rollup = async () => {
  const tsconfig = await import('./tsconfig.json')
  const references: Reference[] = []

  for await (const reference of tsconfig.references) {
    if (await canBundlePacakge(reference)) {
      references.push(reference)
    }
  }

  const referenceEntries = references.flatMap((reference) =>
    formats.map((format) => [reference, format] as const),
  )

  return Promise.all(
    referenceEntries.map(async ([reference, format]) => {
      const [entryFileNames, compilerOptions] = await Promise.all([
        import(`./${reference.path}/package.json`).then((packageJSON) =>
          readEntryFileNames(packageJSON, format),
        ),
        import(`./${reference.path}/tsconfig.json`).then((tsconfig) =>
          readCompilerOptions(tsconfig),
        ),
      ])

      const rollupOptions: RollupOptions = {
        input: `${reference.path}/${outputFile}`,
        output: {
          dir: `${reference.path}/${outputDirectory}`,
          format,
          entryFileNames,
        },
        plugins: [
          typescriptPlugin({
            tsconfig: './tsconfig.base.json',
            compilerOptions,
          }),
          stripPlugin(),
          commonJsPlugin(),
          nodeResolvePlugin(),
        ],
      }

      return rollupOptions
    }),
  )
}

export default rollup
