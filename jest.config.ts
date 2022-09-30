import { lstatSync, readdirSync } from 'fs'
import * as path from 'path'

import type { Config } from 'jest'

const basePath = path.resolve(__dirname, 'packages')
const packages = readdirSync(basePath)
	.filter((name) => lstatSync(path.join(basePath, name)).isDirectory())
	.sort((a, b) => b.length - a.length)

const projects = packages.map((displayName) => ({
	displayName,
	testEnvironment: 'jsdom',
	testMatch: [`<rootDir>/packages/${displayName}/**/*.test.(ts|tsx)`],
}))

const jestConfig: Config = {
	verbose: true,
	errorOnDeprecated: true,
	clearMocks: true,
	projects,
}

export default jestConfig
