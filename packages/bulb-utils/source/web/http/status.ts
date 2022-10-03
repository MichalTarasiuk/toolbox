/**
 * HTTP response status codes indicate whether a specific HTTP request has been successfully completed.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status | MDN docs}
 */
export enum Status {
	/**
	 * 100 Continue.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100 | MDN docs}
	 */
	Continue = 100,
	/**
	 * 101 Switching Protocols.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101 | MDN docs}
	 */
	SwitchingProtocols,
	/**
	 * 103 Early Hints.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103 | MDN docs}
	 */
	EarlyHints = 103,
	/**
	 * 200 OK.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200 | MDN docs}
	 */
	Ok = 200,
	/**
	 * 201 Created.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201 | MDN docs}
	 */
	Created,
	/**
	 * 202 Accepted.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202 | MDN docs}
	 */
	Accepted,
	/**
	 * 203 Non-Authoritative Information.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203 | MDN docs}
	 */
	NonAuthoritativeInformation,
	/**
	 * 204 No Content.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204 | MDN docs}
	 */
	NoContent,
	/**
	 * 205 Reset Content.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205 | MDN docs}
	 */
	ResetContent,
	/**
	 * 206 Partial Content.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206 | MDN docs}
	 */
	PartialContent,
	/**
	 * 300 Multiple Choices.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300 | MDN docs}
	 */
	MultipleChoices = 300,
	/**
	 * 301 Moved Permanently.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301 | MDN docs}
	 */
	MovedPermanently,
	/**
	 * 302 Found.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302 | MDN docs}
	 */
	Found,
	/**
	 * 303 See Other.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303 | MDN docs}
	 */
	SeeOther,
	/**
	 * 304 Not Modified.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304 | MDN docs}
	 */
	NotModified,
	/**
	 * 307 Temporary Redirect.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307 | MDN docs}
	 */
	TemporaryRedirect = 307,
	/**
	 * 308 Permanent Redirect.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308 | MDN docs}
	 */
	PermanentRedirect,
	/**
	 * 400 Bad Request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400 | MDN docs}
	 */
	BadRequest = 400,
	/**
	 * 401 Unauthorized.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401 | MDN docs}
	 */
	Unauthorized,
	/**
	 * 402 Payment Required.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402 | MDN docs}
	 */
	PaymentRequired,
	/**
	 * 403 Forbidden.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403 | MDN docs}
	 */
	Forbidden,
	/**
	 * 404 Not Found.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 | MDN docs}
	 */
	NotFound,
	/**
	 * 405 Method Not Allowed.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405 | MDN docs}
	 */
	MethodNotAllowed,
	/**
	 * 406 Not Acceptable.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406 | MDN docs}
	 */
	NotAcceptable,
	/**
	 * 407 Proxy Authentication Required.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407 | MDN docs}
	 */
	ProxyAuthenticationRequired,
	/**
	 * 408 Request Timeout.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408 | MDN docs}
	 */
	RequestTimeout,
	/**
	 * 409 Conflict.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409 | MDN docs}
	 */
	Conflict,
	/**
	 * 410 Gone.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410 | MDN docs}
	 */
	Gone,
	/**
	 * 411 Length Required.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411 | MDN docs}
	 */
	LengthRequired,
	/**
	 * 412 Precondition Failed.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412 | MDN docs}
	 */
	PreconditionFailed,
	/**
	 * 413 Payload Too Large.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413 | MDN docs}
	 */
	PayloadTooLarge,
	/**
	 * 414 URI Too Long.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414 | MDN docs}
	 */
	UriTooLong,
	/**
	 * 415 Unsupported Media Type.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415 | MDN docs}
	 */
	UnsupportedMediaType,
	/**
	 * 416 Range Not Satisfiable.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416 | MDN docs}
	 */
	RangeNotSatisfiable,
	/**
	 * 417 Expectation Failed.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417 | MDN docs}
	 */
	ExpectationFailed,
	/**
	 * 418 I'm a teapot.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418 | MDN docs}
	 */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ImATeapot,
	/**
	 * 422 Unprocessable Entity.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422 | MDN docs}
	 */
	UnprocessableEntity = 422,
	/**
	 * 425 Too Early.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425 | MDN docs}
	 */
	TooEarly = 425,
	/**
	 * 426 Upgrade Required.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426 | MDN docs}
	 */
	UpgradeRequired,
	/**
	 * 428 Precondition Required.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428 | MDN docs}
	 */
	PreconditionRequired = 428,
	/**
	 * 429 Too Many Requests.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429 | MDN docs}
	 */
	TooManyRequests,
	/**
	 * 431 Request Header Fields Too Large.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431 | MDN docs}
	 */
	RequestHeaderFieldsTooLarge = 431,
	/**
	 * 451 Unavailable For Legal Reasons.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451 | MDN docs}
	 */
	UnavailableForLegalReasons = 451,
	/**
	 * 500 Internal Server Error.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 | MDN docs}
	 */
	InternalServerError = 500,
	/**
	 * 501 Not Implemented.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501 | MDN docs}
	 */
	NotImplemented,
	/**
	 * 502 Bad Gateway.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502 | MDN docs}
	 */
	BadGateway,
	/**
	 * 503 Service Unavailable.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503 | MDN docs}
	 */
	ServiceUnavailable,
	/**
	 * 504 Gateway Timeout.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504 | MDN docs}
	 */
	GatewayTimeout,
	/**
	 * 505 HTTP Version Not Supported.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505 | MDN docs}
	 */
	HttpVersionNotSupported,
	/**
	 * 506 Variant Also Negotiates.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506 | MDN docs}
	 */
	VariantAlsoNegotiates,
	/**
	 * 507 Insufficient Storage.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507 | MDN docs}
	 */
	InsufficientStorage,
	/**
	 * 508 Loop Detected.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508 | MDN docs}
	 */
	LoopDetected,
	/**
	 * 510 Not Extended.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510 | MDN docs}
	 */
	NotExtended = 510,
	/**
	 * 511 Network Authentication Required.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/51 | MDN docs}
	 */
	NetworkAuthenticationRequired,
}
