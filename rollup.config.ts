import typescriptPlugin from '@rollup/plugin-typescript'
import { isObject, keyIn } from '@jupiter/utils'
import { loadJsonFileSync } from 'load-json-file'

import tsconfig from './tsconfig.json'

import type { RollupOptions } from 'rollup'
import type { JsonValue } from 'load-json-file'

type RollupOptionsList = Array<RollupOptions>

const shouldSkip = ['packages/jupiter-typescript']

const readCompilerOptions = (tsconfig: JsonValue) => {
  if (
    isObject(tsconfig) &&
    keyIn(tsconfig, 'compilerOptions') &&
    isObject(tsconfig.compilerOptions)
  ) {
    return tsconfig.compilerOptions
  }

  return {}
}

const rollup = () => {
  const rollupOptionsList: RollupOptionsList = tsconfig.references
    .filter((reference) => shouldSkip.includes(reference.path))
    .map((reference) => {
      const tsconfig = loadJsonFileSync(`${reference.path}/tsconfig.json`)
      const compilerOptions = readCompilerOptions(tsconfig)

      return {
        input: `${reference.path}/_api.ts`,
        plugins: [
          typescriptPlugin({
            tsconfig: './tsconfig.base.json',
            compilerOptions,
          }),
        ],
      }
    })

  return rollupOptionsList
}

export default rollup
