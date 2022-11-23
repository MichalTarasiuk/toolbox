import type {Custom} from '@tool/typescript';

type BooleanToString<Bool extends boolean> = Bool extends true ? 'true' : 'false';

export const booleanToString = <Bool extends boolean>(bool: Custom.Narrow<Bool>) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow down type
  bool.toString() as BooleanToString<Bool>;
