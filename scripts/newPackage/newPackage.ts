import {isString, signs, timeout} from '@tool/utils';
import prompt from 'prompt';

import packageJSON from '../../package.json';

import {createTree, getWorkspace} from './utils';

const repositoryName = packageJSON.name;
const addPrefix = (name: string) => `${repositoryName}${signs.minus}${name}`;

const getName = () => {
  const prop = 'name';

  return new Promise<string>((resolve, reject) => {
    prompt.start();

    prompt.get([prop], (error, properties) => {
      if (error) {
        reject(error);
      }

      const name = properties[prop];

      if (isString(name)) {
        resolve(name);
      }
    });
  });
};

export const newPackage = async () => {
  try {
    const namePromise = getName();
    const name = await timeout(namePromise, 4_000);

    const packageName = addPrefix(name);
    const workspace = getWorkspace('packages');

    const tree = createTree(workspace);

    await tree.render({
      name: packageName,
      children: [{name: 'source', children: ['source.ts']}, 'test', '_api.ts', 'tsconfig.json', 'package.json'],
    });
  } catch (error) {
    console.log(error);
  }
};

void newPackage();
