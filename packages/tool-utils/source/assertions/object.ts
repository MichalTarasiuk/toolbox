/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {Custom} from '@tool/typescript';
import type {Object as ObjectType, Any} from '@tool/typescript';

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns the names of the enumerable string properties and methods of an object
 */
export const objectKeys = <GenericObject extends Any.AnyObject, NarrowType extends boolean = true>(
  object: GenericObject,
  _narrowType?: NarrowType,
) => Object.keys(object) as NarrowType extends true ? ObjectType.Keys<GenericObject> : Array<keyof GenericObject>;

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns an array of key/values of the enumerable properties of an object
 */
export const entries = <GenericObject extends Any.AnyObject, NarrowType extends boolean = true>(
  object: GenericObject,
  _narrowType?: NarrowType,
) =>
  Object.entries(object) as NarrowType extends true
    ? ObjectType.Entries<GenericObject>
    : Array<[keyof GenericObject, GenericObject[keyof GenericObject]]>;

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
  entries: Entries,
  _narrowType?: NarrowType,
) =>
  Object.fromEntries(entries) as NarrowType extends true
    ? Custom.Debug<ObjectType.FromEntries<Entries>>
    : Any.AnyObject<Entry[1], Entry[0]>;

type KeyIn<GenericObject extends Any.AnyObject, Key extends PropertyKey> = Any.AnyObject<unknown, Key> & GenericObject;

/**
 * @param object - Specified object.
 * @param key - Specified property.
 *
 * @returns true if the specified property is in the specified object
 */
export const keyIn = <GenericObject extends Any.AnyObject, Key extends PropertyKey>(
  object: GenericObject,
  key: Key,
): object is Custom.Debug<KeyIn<GenericObject, Key>> => key in object;
