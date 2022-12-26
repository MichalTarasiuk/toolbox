/* eslint-disable @typescript-eslint/no-explicit-any */
import commonJsPlugin from '@rollup/plugin-commonjs';
import {nodeResolve as nodeResolvePlugin} from '@rollup/plugin-node-resolve';
import stripPlugin from '@rollup/plugin-strip';
import typescriptPlugin from '@rollup/plugin-typescript';
import {isObject, isJSON, keyIn, signs, isString, empty, objectKeys} from '@tool/utils';

import type {RollupOptions} from 'rollup';
import type {Any} from '@tool/typescript';

type TypescriptConfig = typeof import('./tsconfig.json');

type References = TypescriptConfig['references'];
type Reference = References[number];

type FormatMapper = typeof formatMapper;

const config = {
  inputFile: '_api.ts',
  outputDirectory: 'build',
  formats: ['cjs', 'es'],
} as const;

const formatMapper = {
  es: 'import',
  cjs: 'require',
  umd: 'browser',
} as const;

const toPath = (...fileNames: string[]) => fileNames.join(signs.slash);

const canBundlePacakge = async (reference: Reference) => {
  const defaultCanBundlePackage = true;
  const packageJSON = await import(`./${reference.path}/package.json`);

  return isObject(packageJSON) && (keyIn(packageJSON, 'build') ? packageJSON.build : defaultCanBundlePackage);
};

const isDependencies = (maybeDependencies: unknown): maybeDependencies is Any.AnyObject<string, string> =>
  isObject(maybeDependencies) &&
  objectKeys(maybeDependencies).every(isString) &&
  Object.values(maybeDependencies).every(isString);

const readPackageJSON = async (referencePath: string, format: keyof FormatMapper) => {
  const packageJSON = await import(`./${referencePath}/package.json`);

  if (!isJSON(packageJSON)) {
    throw Error('package package.json should be defined');
  }

  const exportName = formatMapper[format];
  const entryFileNames = (packageJSON['exports'] as any)[exportName];

  if (!isString(entryFileNames)) {
    throw Error('entryFileNames is not valid');
  }

  const dependencies: unknown = packageJSON['dependencies'] ?? empty.object;

  if (!isDependencies(dependencies)) {
    throw Error('dependencies are not valid');
  }

  const resolveOnly = Object.values(dependencies);

  return {
    entryFileNames,
    resolveOnly,
  };
};

const readTypescriptConfig = (referencePath: string) => import(`./${referencePath}/tsconfig.json`);

const runRollup = async () => {
  const typescriptConfig = await import('./tsconfig.json');
  const references: Reference[] = [];

  for await (const reference of typescriptConfig.references) {
    if (await canBundlePacakge(reference)) {
      references.push(reference);
    }
  }

  const referenceEntries = references.flatMap(reference => config.formats.map(format => [reference, format] as const));

  return Promise.all(
    referenceEntries.map(async ([reference, format]) => {
      const [extendedTypescriptConfig, {resolveOnly, entryFileNames}] = await Promise.all([
        readTypescriptConfig(reference.path),
        readPackageJSON(reference.path, format),
      ]);

      const rollupOptions: RollupOptions = {
        input: toPath(reference.path, config.inputFile),
        output: {
          dir: toPath(reference.path, config.outputDirectory),
          format,
          entryFileNames,
        },
        plugins: [
          typescriptPlugin({
            tsconfig: './tsconfig.base.json',
            ...extendedTypescriptConfig,
          }),
          stripPlugin(),
          commonJsPlugin(),
          nodeResolvePlugin({
            resolveOnly,
          }),
        ],
      };

      return rollupOptions;
    }),
  );
};

export default runRollup;
