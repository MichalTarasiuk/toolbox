/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns the names of the enumerable string properties and methods of an object
 */
export const objectKeys = <Object extends AnyObject>(object: Object) =>
  Object.keys(object) as Array<keyof Object>

/**
 * @param object - Object that contains the properties and methods.
 *
 * @returns an array of key/values of the enumerable properties of an object
 */
export const entries = <Object extends AnyObject>(object: Object) =>
  Object.entries(object) as Array<[keyof Object, Object[keyof Object]]>

/**
 * @param entries - An iterable object that contains key-value entries for properties and methods.
 *
 * @returns an object created by key-value entries for properties and methods
 */
export const fromEntries = <Entries extends Array<[PropertyKey, unknown]>>(
  entries: Entries,
) =>
  Object.fromEntries(entries) as Record<Entries[number][0], Entries[number][1]>

/**
 * @param object - Specified object.
 * @param key - Specified property.
 *
 * @returns true if the specified property is in the specified object
 */
export const keyIn = <Object extends AnyObject>(
  object: Object,
  key: PropertyKey,
): object is Object & { key: unknown } => key in object
