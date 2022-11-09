import typescriptPlugin from '@rollup/plugin-typescript'
import stripPlugin from '@rollup/plugin-strip'
import { isObject, keyIn } from '@wren/utils'

import type { RollupOptions } from 'rollup'

type RollupOptionsList = Array<RollupOptions>

const shouldSkip = ['packages/jupiter-typescript']

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

const rollup = async () => {
  const tsconfig = await import('./tsconfig.json')

  const rollupOptionsList: RollupOptionsList = await Promise.all(
    tsconfig.references
      .filter((reference) => !shouldSkip.includes(reference.path))
      .map(async (reference) => {
        const tsconfig = await import(`./${reference.path}/tsconfig.json`)
        const compilerOptions = readCompilerOptions(tsconfig)

        return {
          input: `${reference.path}/_api.ts`,
          output: {
            dir: `${reference.path}/build`,
            format: 'cjs',
          },
          plugins: [
            typescriptPlugin({
              tsconfig: './tsconfig.base.json',
              compilerOptions,
            }),
            stripPlugin(),
          ],
        }
      }),
  )

  return rollupOptionsList
}

export default rollup
