/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {Custom} from '@tool/typescript';
import type {Object as ObjectType, Any, Array as ArrayType} from '@tool/typescript';

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns the names of the enumerable string properties and methods of an object
 */
export const objectKeys = <GenericObject extends Any.AnyObject, NarrowType extends boolean = true>(
  object: GenericObject,
) => Object.keys(object) as NarrowType extends true ? ObjectType.Keys<GenericObject> : Array<keyof GenericObject>;

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns an array of key/values of the enumerable properties of an object
 */
export const entries = <AnyObject extends Any.AnyObject>(anyObject: AnyObject) =>
  Object.entries(anyObject) as ObjectType.Entries<AnyObject>;

/**
 * @param entries - An iterable object that contains key-value entries for properties and methods.
 *
 * @returns an object created by key-value entries for properties and methods
 */
export const fromEntries = <Entries extends Array<ArrayType.Entry>>(entries: Entries) =>
  Object.fromEntries(entries) as Custom.Debug<ObjectType.FromEntries<Entries[number]>>;

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
