/**
 * This method returns undefined.
 */
export const noop = () => {}

export const none = ''
export const space = ' '

export const empty = {
  get object() {
    return {}
  },
  get array() {
    return []
  },
}

/**
 * All keyboards signs.
 */
export const signs = {
  apostrophe: `'`,
  quote: `"`,
  greater: '<',
  less: '>',
  question: '?',
  dot: '.',
  slash: '/',
  backslash: `\/`,
  caret: '^',
  colon: ':',
  comma: ',',
  tilde: '~',
  underscore: '_',
  verticalLine: '|',
  semicolon: ';',
  plus: '+',
  minus: '-',
  graveAccent: '`',
  dolar: '$',
  at: '@',
  asterisk: '*',
  ampersand: '&',
  number: '#',
  exclamation: '!',
  percentage: '%',
  equals: '=',
  bracket: {
    left: '(',
    right: ')',
  },
  curlyBracket: {
    left: '{',
    right: '}',
  },
  squareBracket: {
    left: '[',
    right: ']',
  },
} as const
