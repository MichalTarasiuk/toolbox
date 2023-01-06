type BooleanToString<Bool extends boolean> = Bool extends true ? 'true' : 'false';

export const booleanToString = <Bool extends boolean>(bool: Bool) => bool.toString() as BooleanToString<Bool>;
