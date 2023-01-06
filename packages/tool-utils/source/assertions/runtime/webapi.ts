export const isSupportingWebSockets = () => 'WebSocket' in window;

export const isSupportingClipboard = () => Boolean(navigator.clipboard);

export const isSupportingIndexedDb = () => Boolean(window.indexedDB);
