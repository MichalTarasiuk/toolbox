import {isClient, isServer} from '../../_api';

describe('jsdom - logic:web', () => {
  test('logic:web:canUseDOM', () => {
    // isServer
    expect(isServer()).toBeFalsy();

    // isClient
    expect(isClient()).toBeTruthy();
  });
});
