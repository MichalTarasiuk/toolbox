import type {generateTokens} from './helpers';
import type {Any} from '@tool/typescript';

export type Steps = Any.AnyObject<{name: string; canGo: (...params: unknown[]) => boolean}, number>;

export type Tokens = ReturnType<typeof generateTokens>;
