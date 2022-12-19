import type {Any} from '@tool/typescript';

export * from './areHookInputsEqual';
export * from './reactify/reactify';
export * from './wrapContext';
export * from './traverseFiber';
export * from './contextify';
export * from './suspensify';
export * from './flatMapChildren';
export * from './hookify';

export const Null = () => <></>;

export const blockBatching = (fn: Any.UnknownFunction) => setTimeout(fn, 0);

export const isReact18 = () => (process.env['REACTJS_VERSION'] || '18') === '18';
