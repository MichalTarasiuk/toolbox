export type ToNumber<Value extends string> = Value extends `${infer Number extends number}` ? Number : never;
