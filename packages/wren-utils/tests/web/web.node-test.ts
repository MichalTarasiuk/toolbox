import {
  clientErrors,
  informational,
  isClient,
  isServer,
  isValidJSON,
  none,
  redirects,
  serverErrors,
  signs,
  Status,
  success,
} from '../../_api'

describe('node - logic:web', () => {
  test('logic:web:canUseDOM', () => {
    // isServer
    expect(isServer()).toBeTruthy()

    // isClient
    expect(isClient()).toBeFalsy()
  })

  test('logic:web:http', () => {
    // isValidJSON
    const user = {
      name: 'Michał',
      age: 19,
    }
    const stringifyUser = JSON.stringify(user)

    expect(isValidJSON(stringifyUser)).toBeTruthy()
    expect(isValidJSON(stringifyUser.replaceAll(signs.quote, none))).toBeFalsy()

    // statusRange
    expect(informational.has(Status.Continue)).toBeTruthy()
    expect(informational.has(Status.Created)).toBeFalsy()

    expect(success.has(Status.Ok)).toBeTruthy()
    expect(success.has(Status.MovedPermanently)).toBeFalsy()

    expect(redirects.has(Status.MultipleChoices)).toBeTruthy()
    expect(redirects.has(Status.Unauthorized)).toBeFalsy()

    expect(clientErrors.has(Status.BadRequest)).toBeTruthy()
    expect(clientErrors.has(Status.NotImplemented)).toBeFalsy()

    expect(serverErrors.has(Status.InternalServerError)).toBeTruthy()
    expect(serverErrors.has(Status.Continue)).toBeFalsy()
  })
})
