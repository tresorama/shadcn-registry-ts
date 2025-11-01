### getExpressRequestInfo

Utilities that extract common used data for logging/debugging from *express*'s **Request** and **Response** objects.

```ts
import { getExpressRequestInfo } from './express.utils';

const reqInfo = getExpressRequestInfo(
  req, // Express Request object
  res, // Express Response object
  'an-id-for-this-request-used-only-by-you-to-identify-it',
);
// ⏬
{
  reqData: {
    id: 'an-id-for-this-request-used-only-by-you-to-identify-it',
    origin: 'http://localhost:3000',
    method: 'GET',
    hostname: 'localhost',
    path: '/api',
    query: {},
    full_url: 'http://localhost:3000/api',
    headers: {},
  },
  resData: {
    statusCode: 200,
    statusMessage: 'OK',
    responseTime: 'responseTime' in res ? res.responseTime : 'unknown',
    headers: ('_header' in res && typeof res._header === 'string') ? res._header.split('\n') : 'unknown',
  },
}
```