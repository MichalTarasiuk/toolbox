/**
 * Checks if localStorage or sessionStorage is enabled.
 */
export const isStorageEnabled = (storageType: `${'session' | 'local'}Storage`) => {
  try {
    const item = {
      key: '__storage__key__',
      value: '__storage__value__',
    };

    window[storageType].setItem(item.key, item.value);
    window[storageType].removeItem(item.key);
    return true;
  } catch {
    return false;
  }
};
