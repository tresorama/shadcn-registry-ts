
**Basic Usage**  

```ts

import z from 'zod';

import {
  schemaResult,
  schemaResultSuccess,
  schemaResultError,
  type InferResult,
  type InferResultSuccess,
  type InferResultError,
} from './ts-result-zod';

const schemaFn1Result = schemaResult(
    schemaResultSuccess(z.object({ name: z.string() })),
    schemaResultError(['FETCH_FAILED', 'UNKNOWN_ERROR'] as const),
  );

type Fn1Result = InferResult<typeof schemaFn1Result>;

const fn1 = async (): Promise<Fn1Result> => {

  // ts force you to return a discriminated union

  try {
    const result = await fetch('https://api.example.com');

    // for error not unexpected
    if (!result.ok) {
      return {
        status: 'error',
        code: 'FETCH_FAILED',
        message: 'Fetch status is not ok: ' + result.status,
      };
    }

    // for success
    return {
      status: 'success',
      data: await result.json(),
    };
  }
  catch (error) {
    // for error unexpected
    return {
      status: 'error',
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong with fetch',
    };

  }

};

```

**Infer Types**  

```ts
import z from 'zod';

import {
  schemaResult,
  schemaResultSuccess,
  schemaResultError,
  type InferResult,
  type InferResultSuccess,
  type InferResultError,
} from './ts-result-zod';

const simpleResult = schemaResult(
  schemaResultSuccess(z.object({ name: z.string(), age: z.number() })),
  schemaResultError(['MY_ERROR_CODE', 'UNKNOWN_ERROR'] as const),
);

type SimpleResult = InferResult<typeof simpleResult>;
// ⏬
{
  status: "success";
  data: {
      name: string;
      age: number;
  };
} | {
  status: "error";
  code: "UNKNOWN_ERROR" | "MY_ERROR_CODE";
  message: string;
}

type SimpleResultSuccess = InferResultSuccess<typeof simpleResult>;
// ⏬
{
  status: "success";
  data: {
      name: string;
      age: number;
  };
}


type SimpleResultError = InferResultError<typeof simpleResult>;
// ⏬
{
  status: "error";
  code: "UNKNOWN_ERROR" | "MY_ERROR_CODE";
  message: string;
}


```

**Wrap Result in an other Result**  

```ts
import z from 'zod';

import {
  schemaResult,
  schemaResultSuccess,
  schemaResultError,
  type InferResult,
  getResultData,
} from './ts-result-zod';

// define first result
const simpleResult = schemaResult(
  schemaResultSuccess(z.object({ name: z.string(), age: z.number() })),
  schemaResultError(['MY_ERROR_CODE', 'UNKNOWN_ERROR'] as const),
);

// define second result that wrap the first
const wrappedResult = schemaResult(
  schemaResultSuccess(
    z.object({
      simpleData: getResultData(simpleResult).successData,
      extraInfo: z.string(),
    }),
  ),
  schemaResultError([
    'INVALID_INPUT',
    ...getResultData(simpleResult).errorCodes
  ] as const),
);

// infer types of the wrapped result
type WrappedResult = InferResult<typeof wrappedResult>;
// ⏬
{
  status: "success";
  data: {
      simpleData: {
          name: string;
          age: number;
      };
      extraInfo: string;
  };
} | {
  status: "error";
  code: "UNKNOWN_ERROR" | "MY_ERROR_CODE" | "INVALID_INPUT";
  message: string;
}


// use it

const fnWrapped = async (): Promise<WrappedResult> => {
  // ...
}

```