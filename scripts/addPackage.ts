import path from 'path'

import { signs } from '@bulb/utils'
import makeDir from 'make-dir'

import packageJSON from '../package.json'

const repositoryName: string = packageJSON.name
const workspace = path.join

const addPrefix = (name: string) => `${repositoryName}${signs.minus}${name}`

export const addPackage = (name: string) => {
  const packageName = addPrefix(name)

  makeDir()
}
