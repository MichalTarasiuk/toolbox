import type {Any} from '@tool/typescript';
import type {generateTokens} from './helpers';

export type Steps = Any.AnyObject<{name: string; canGo: (...params: unknown[]) => boolean}, number>;

export type Tokens = ReturnType<typeof generateTokens>;
