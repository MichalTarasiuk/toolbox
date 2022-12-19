import platform from 'platform';

import {unknownProperty, operatingSystem} from './consts';

export const getBrowserName = () => (platform.name ?? unknownProperty).toLowerCase();

export const getOS = () => ({
  architecture: unknownProperty,
  family: unknownProperty,
  version: unknownProperty,
  ...platform.os,
});

export const getOSFamily = () => {
  const family = getOS().family?.toLowerCase();

  if (family.includes('windows')) {
    return operatingSystem.windows;
  }

  if (family.includes('android')) {
    return operatingSystem.android;
  }

  if (family.includes('ios')) {
    return operatingSystem.ios;
  }

  if (['os x', 'mac os'].includes(family)) {
    return operatingSystem.mac;
  }

  return operatingSystem.linux;
};
