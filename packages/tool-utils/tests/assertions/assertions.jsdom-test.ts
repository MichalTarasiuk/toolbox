import {isClient, isServer} from '../../_api';

describe('node - utils:assertions', () => {
  it('should return `true` on client side', () => {
    expect(isClient()).toBeTruthy();
    expect(isServer()).toBeFalsy();
  });
});
