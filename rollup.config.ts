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
  const hasExportsProp = isObject(packageJSON) && keyIn(packageJSON, 'exportss')
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
    return packageJSON.exports[key].replace(/\.\/build\//, none)
  }

  throw Error('something went wrong')
}

const rollup = async () => {
  const tsconfig = await import('./tsconfig.json')
  const references: Reference[] = []

  for await (const reference of tsconfig.references) {
    if (await canBundlePacakge(reference)) {
      references.push(reference)
    }
  }

  return Promise.all(
    formats.flatMap((format) =>
      references.map(async (reference: Reference) => {
        const packageJSON = await import(`./${reference.path}/package.json`)
        const entryFileNames = readEntryFileNames(packageJSON, format)

        const tsconfig = await import(`./${reference.path}/tsconfig.json`)
        const compilerOptions = readCompilerOptions(tsconfig)

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
    ),
  )
}

export default rollup
