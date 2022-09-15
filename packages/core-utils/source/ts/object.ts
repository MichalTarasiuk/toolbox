type AnyObject = Record<PropertyKey, unknown>

export const objectKeys = <Object extends AnyObject>(object: Object) =>
  Object.keys(object) as Array<keyof Object>
