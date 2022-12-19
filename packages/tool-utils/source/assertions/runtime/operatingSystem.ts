import {operatingSystem} from './consts';
import {getOSFamily} from './helpers';

export const isIOS = () => getOSFamily() === operatingSystem.ios;

export const isAndroid = () => getOSFamily() === operatingSystem.android;

export const isMobileOS = () => isIOS() || isAndroid();

export const isLinux = () => getOSFamily() === operatingSystem.linux;

export const isWindows = () => getOSFamily() === operatingSystem.windows;

export const isMacOS = () => getOSFamily() === operatingSystem.mac;

export const isDesktopOS = () => isMacOS() || isWindows() || isLinux();
