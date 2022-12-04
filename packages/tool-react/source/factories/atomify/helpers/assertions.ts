import {isUndefined} from '@tool/utils';

import type {CustomSet, ResolvableState} from '../types';

export const withNativeSet = <State, Params extends unknown[]>(
  customSet: CustomSet<State, Params> | undefined,
  _params: unknown[],
): _params is [ResolvableState<State>] => isUndefined(customSet);
