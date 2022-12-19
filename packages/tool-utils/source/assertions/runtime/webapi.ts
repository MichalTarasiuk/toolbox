export const isSupportingWebSockets = () => {
  try {
    return 'WebSocket' in window;
  } catch (error) {
    return false;
  }
};

export const isSupportingClipboard = () => !!navigator.clipboard;

export const isSupportingIndexedDb = () => {
  try {
    return !!window.indexedDB;
  } catch (error) {
    return false;
  }
};
