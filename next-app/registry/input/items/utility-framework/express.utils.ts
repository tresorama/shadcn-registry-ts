import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

/**
 * Function that extract common data from Express Request and Response objects.  
 * Useful for logging and debugging.
 */
export const getExpressRequestInfo = (
  /** Express Request object */
  req: ExpressRequest,
  /** Express Response object */
  res: ExpressResponse,
  /** Request identifier. Used only by you to identify it. */
  reqId: string,
) => {

  // get request data
  const isHostLocalhost = req.hostname === 'localhost' || req.hostname.startsWith('192.168.');
  const reqData = {
    id: reqId,
    origin: req.headers.origin,
    method: req.method,
    hostname: req.hostname,
    path: req.path,
    query: req.query,
    full_url: [
      req.protocol,
      "://",
      req.hostname,
      isHostLocalhost ? `:${req.socket.localPort}` : '',
      req.originalUrl,
    ].join(''),
    headers: req.headers,
  };

  // get response data
  const resData = {
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
    responseTime: 'responseTime' in res ? res.responseTime : 'unknown',
    headers: ('_header' in res && typeof res._header === 'string') ? res._header.split('\n') : 'unknown',
  };

  return {
    reqData,
    resData,
  };
};

