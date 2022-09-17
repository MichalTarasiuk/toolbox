/**
 * Returns the names of the enumerable string properties and methods of an object.
 *
 * @param object - Object that contains the properties and methods.
 *
 * @returns properties and methods of object
 */
export const objectKeys = <Object extends AnyObject>(object: Object) =>
  Object.keys(object) as Array<keyof Object>
