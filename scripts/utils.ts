import {join} from 'path';

import {isArray, isObject, isString, keyIn} from '@tool/utils';
import createFile from 'create-file';
import makeDir from 'make-dir';

export const getWorkspace = (name: string = '') => join(process.cwd(), name);
export const hasExtension = (name: string) => /^\w+.\w+$/.test(name);

// scripts:utils:createTree

type Tree = {
  name: string;
  children: Array<Tree | string>;
};

type TreeNode = Tree | string;

const isTree = (value: unknown): value is Tree => {
  const canCheck = isObject(value);

  if (canCheck) {
    const hasName = keyIn(value, 'name') && isString(value.name);
    const hasChildren = keyIn(value, 'children') && isArray(value.children);

    return hasName && hasChildren;
  }

  return canCheck;
};

export const createTree = (path: string) => {
  const render = async (treeNode: TreeNode) => {
    if (isTree(treeNode)) {
      await makeDir(join(path, treeNode.name));

      await Promise.all(treeNode.children.map(child => render(child)));

      return;
    }

    await (hasExtension(treeNode) ? createFile(treeNode) : makeDir(treeNode));
  };

  return {
    render,
  };
};
