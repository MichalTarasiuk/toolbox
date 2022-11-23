import {objectKeys} from '@tool/utils';
import {createContext, useContext} from 'react';

import {isServerCacheKey} from './assertions';

import type {Any} from '@tool/typescript';
import type {ReactNode} from 'react';

type ServerCacheProviderProps = {
  children: ReactNode;
  serverCache: Any.AnyObject;
};

const initialContextValue = Symbol();
const serverCacheContext = createContext<Any.AnyObject | typeof initialContextValue>(initialContextValue);

const canCache = (value: Any.AnyObject) => objectKeys(value).every(isServerCacheKey);

export const ServerCacheProvider = ({serverCache, children}: ServerCacheProviderProps) => {
  if (canCache(serverCache)) {
    throw Error(`serverCache prop is not a valid cache ¯\_(ツ)_/¯`);
  }

  return <serverCacheContext.Provider value={serverCache}>{children}</serverCacheContext.Provider>;
};

export const useServerCache = () => {
  const context = useContext(serverCacheContext);

  if (context === initialContextValue) {
    throw Error('useServerCache must be called within a <ServerCacheProvider />');
  }

  return context;
};
