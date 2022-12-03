import type {Custom} from '@tool/typescript';
import type {Object as ObjectType, Any} from '@tool/typescript';

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns the names of the enumerable string properties and methods of an object
 */
export const objectKeys = <Object extends Any.AnyObject, NarrowType extends boolean = true>(
  object: Object,
  _narrowType?: NarrowType,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  Object.keys(object) as NarrowType extends true ? ObjectType.Keys<Object> : Array<keyof Object>;

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns an array of key/values of the enumerable properties of an object
 */
export const entries = <Object extends Any.AnyObject, NarrowType extends boolean = true>(
  object: Object,
  _narrowType?: NarrowType,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  Object.entries(object) as NarrowType extends true
    ? ObjectType.Entries<Object>
    : Array<[keyof Object, Object[keyof Object]]>;

/**
 * @param entries - An iterable object that contains key-value entries for properties and methods.
 *
 * @returns an object created by key-value entries for properties and methods
 */
export const fromEntries = <
  Entries extends Array<[PropertyKey, unknown]>,
  NarrowType extends boolean = true,
  Entry extends Entries[number] = Entries[number],
>(
  entries: Custom.Narrow<Entries>,
  _narrowType?: NarrowType,
) =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safety assertion
  Object.fromEntries(entries) as NarrowType extends true
    ? Custom.Debug<ObjectType.FromEntries<Entries>>
    : Any.AnyObject<Entry[1], Entry[0]>;

type KeyIn<Object extends Any.AnyObject, Key extends PropertyKey> = Any.AnyObject<unknown, Key> & Object;

/**
 * @param object - Specified object.
 * @param key - Specified property.
 *
 * @returns true if the specified property is in the specified object
 */
export const keyIn = <Object extends Any.AnyObject, Key extends PropertyKey>(
  object: Object,
  key: Key,
): object is Custom.Debug<KeyIn<Object, Key>> => key in object;
