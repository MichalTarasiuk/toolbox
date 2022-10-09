/* eslint-disable @typescript-eslint/consistent-type-assertions -- safty assertions */
import type { Any } from '@bulb/typescript'
import type { String, Any as A } from 'ts-toolbelt'

const equalsSign = '=' as const
const semicolonSign = '; ' as const

type ParseCookie<Cookie extends string> = {
  [Tuple in String.Split<
    String.Split<Cookie, typeof semicolonSign>[number],
    typeof equalsSign
  > as Tuple[0]]: A.Is<Tuple[1], undefined> extends 1 ? string : Tuple[1]
}

/**
 * Parses an HTTP Cookie header string, returning an object of all cookie name-value pairs.
 */
export const parseCookie = <
  Cookie extends string,
  ParsedCookie extends ParseCookie<Cookie>,
>(
  cookie: Cookie,
) =>
  cookie
    .split(semicolonSign)
    .map((item) => item.split(equalsSign))
    .filter((splitedItem): splitedItem is [string, string] =>
      Boolean(splitedItem[0] && splitedItem[1]),
    )
    .reduce((collector, [key, value]) => {
      collector[decodeURIComponent(key)] = decodeURIComponent(value)

      return collector
    }, {} as Any.AnyObject) as unknown as ParsedCookie
