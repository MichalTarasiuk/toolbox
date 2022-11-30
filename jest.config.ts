import {lstatSync, readdirSync} from 'fs';
import * as path from 'path';

import type {Config} from 'jest';

const basePath = path.resolve(__dirname, 'packages');
const packages = readdirSync(basePath)
  .filter(name => lstatSync(path.join(basePath, name)).isDirectory())
  .sort((a, b) => b.length - a.length);

const testEnvironments = ['jsdom', 'node'];

const projects = packages.flatMap(displayName =>
  testEnvironments.map(testEnvironment => ({
    displayName,
    testEnvironment,
    testMatch: [`<rootDir>/packages/${displayName}/**/*.${testEnvironment}-test.(ts|tsx)`],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  })),
);

const jestConfig: Config = {
  verbose: true,
  errorOnDeprecated: true,
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx'],
  projects,
};

export default jestConfig;
