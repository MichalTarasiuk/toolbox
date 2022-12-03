import {uppercaseFirst, empty} from '@tool/utils';
import {createContext as createContextImpl, useContextSelector} from 'use-context-selector';

import type {Context} from 'use-context-selector';

type Selector<ContextValue, Selected> = (contextValue: ContextValue) => Selected;

const defaultContextValue = empty.object;

const getErrorMessage = (name: string) => `use${uppercaseFirst(name)} must be used within a ${name}Provider`;

const isInvalidHookCall = (contextValue: unknown): contextValue is typeof defaultContextValue =>
  contextValue === defaultContextValue;

const createContext = <ContextValue>() =>
  createContextImpl<ContextValue | typeof defaultContextValue>(defaultContextValue);

export const createSelectorContext = <ContextValue>(name: string) => {
  const selectorContext = createContext<ContextValue>();
  const uppercasedName = uppercaseFirst(name);

  const useSelectorContext = <Selected = ContextValue>(selectorImpl?: Selector<ContextValue, Selected>) => {
    const safeSelector = (value: ContextValue) => (selectorImpl ? selectorImpl(value) : (value as unknown as Selected));
    const selector = (value: ContextValue) =>
      value === defaultContextValue ? defaultContextValue : safeSelector(value);
    const selected = useContextSelector(selectorContext as Context<ContextValue>, selector);

    if (isInvalidHookCall(selected)) {
      const errorMessage = getErrorMessage(name);

      throw Error(errorMessage);
    }

    return selected;
  };

  selectorContext.displayName = `${uppercasedName}Context`;

  return [selectorContext.Provider, useSelectorContext] as const;
};
