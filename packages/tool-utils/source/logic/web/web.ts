export * from './http/http';
export * from './window/window';
export * from './debounce';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
);

export const isServer = () => !canUseDOM;
export const isClient = () => canUseDOM;
