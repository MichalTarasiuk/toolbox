import {clientErrors, informational, isSameOrigin, redirects, serverErrors, Status, success} from '../_api';

describe('node - utils:http', () => {
  it('should return `true` when status is in range', () => {
    expect(informational.has(Status.Continue)).toBeTruthy();
    expect(informational.has(Status.Created)).toBeFalsy();

    expect(success.has(Status.Ok)).toBeTruthy();
    expect(success.has(Status.MovedPermanently)).toBeFalsy();

    expect(redirects.has(Status.MultipleChoices)).toBeTruthy();
    expect(redirects.has(Status.Unauthorized)).toBeFalsy();

    expect(clientErrors.has(Status.BadRequest)).toBeTruthy();
    expect(clientErrors.has(Status.NotImplemented)).toBeFalsy();

    expect(serverErrors.has(Status.InternalServerError)).toBeTruthy();
    expect(serverErrors.has(Status.Continue)).toBeFalsy();
  });

  it('should return `true` when origins are the same', () => {
    const facebookUrl = 'https://www.facebook.com/';
    const twitterUrl = 'https://twitter.com/';

    expect(isSameOrigin(facebookUrl, twitterUrl)).toBeFalsy();
    expect(isSameOrigin(facebookUrl, facebookUrl)).toBeTruthy();
  });
});
