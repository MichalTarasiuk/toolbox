import type {Array} from '../../_api';

export type AddOne<Digit extends number, Arr = Array.From<Digit>> = Arr extends never[]
  ? Array.Length<[...Arr, never]>
  : never;
