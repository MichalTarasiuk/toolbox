import stripPlugin from '@rollup/plugin-strip'
import typescriptPlugin from '@rollup/plugin-typescript'
import commonJsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import { isObject, keyIn } from '@wren/utils'

type Reference = { path: string }

const outputFile = '_api.ts'
const outputDirectory = 'build'

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

const rollup = async () => {
  const tsconfig = await import('./tsconfig.json')
  const references: Reference[] = []

  for await (const reference of tsconfig.references) {
    if (await canBundlePacakge(reference)) {
      references.push(reference)
    }
  }

  return Promise.all(
    references.map(async (reference: Reference) => {
      const tsconfig = await import(`./${reference.path}/tsconfig.json`)
      const compilerOptions = readCompilerOptions(tsconfig)

      return {
        input: `${reference.path}/${outputFile}`,
        output: {
          dir: `${reference.path}/${outputDirectory}`,
          format: 'cjs',
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
    }),
  )
}

export default rollup
