export const mapKeys = (keys: PropertyKey[], values: unknown[]) =>
  Object.fromEntries(keys.map((key, index) => [key, values[index]]))
