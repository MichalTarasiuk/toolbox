import {isString, keyIn} from '@tool/utils';

import type {GetServerSidePropsContext} from 'next';
import type {ContextUnion} from './createServerHook';

const requiredKeys = ['req', 'res'];

export const isServerSideContext = (context: ContextUnion): context is GetServerSidePropsContext =>
  requiredKeys.every(requiredKey => keyIn(context, requiredKey));

export const isServerCacheKey = (propertyKey: PropertyKey): propertyKey is string =>
  isString(propertyKey) && /[\w-]+:/g.test(propertyKey);
