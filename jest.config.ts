import type { Config } from 'jest'
import * as path from 'path'
import { lstatSync, readdirSync } from 'fs'

const basePath = path.resolve(__dirname, 'packages')
const packages = readdirSync(basePath)
  .filter((name) => lstatSync(path.join(basePath, name)).isDirectory())
  .sort((a, b) => b.length - a.length)

const projects = packages.map((displayName) => ({
  displayName,
  testMatch: [`<rootDir>/packages/${displayName}/**/*.test.ts`],
}))

const config: Config = {
  verbose: true,
  errorOnDeprecated: true,
  clearMocks: true,
  projects,
}

export default config
