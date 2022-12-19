import {getBrowserName} from './helpers';
import {browser} from './consts';

export const isChrome = () => getBrowserName() === browser.chrome;

export const isEdge = () => getBrowserName() === browser.microsoftEdge;

export const isFirefox = () => getBrowserName() === browser.firefox;

export const isInternetExplorer = () => getBrowserName() === browser.ie;

export const isOpera = () => getBrowserName() === browser.opera;

export const isSafari = () => getBrowserName() === browser.safari;
