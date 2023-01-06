export type IsTuple<Value> = [Value] extends [never] ? false : Value extends readonly [unknown?] ? true : false;

export type MaybeReadonly<Value> = Value[] | readonly Value[];

export type Entry = [PropertyKey, unknown];
