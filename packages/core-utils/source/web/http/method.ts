/**
 * Set of HTTP request methods to indicate the desired action to be performed for a given resource.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods | MDN docs}
 */
export enum Method {
  /**
   * The `GET` method requests a representation of the specified resource.
   * Requests using GET should only retrieve data.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET | MDN docs}
   */
  Get = 'GET',
  /**
   * The `HEAD` method asks for a response identical to that of a `GET` request, but without the response body.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD | MDN docs}
   */
  Head = 'HEAD',
  /**
   * The `POST` method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST | MDN docs}
   */
  Post = 'POST',
  /**
   * The `PUT` method replaces all current representations of the target resource with the request payload.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT | MDN docs}
   */
  Put = 'PUT',
  /**
   * The `DELETE` method deletes the specified resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE | MDN docs}
   */
  Delete = 'DELETE',
  /**
   * The `CONNECT` method establishes a tunnel to the server identified by the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT | MDN docs}
   */
  Connect = 'CONNECT',
  /**
   * The `OPTIONS` method is used to describe the communication options for the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS | MDN docs}
   */
  Options = 'OPTIONS',
  /**
   * The `TRACE` method performs a message loop-back test along the path to the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE | MDN docs}
   */
  Trace = 'TRACE',
  /**
   * The `PATCH` method is used to apply partial modifications to a resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATC | MDN docs}
   */
  Patch = 'PATCH',
}
