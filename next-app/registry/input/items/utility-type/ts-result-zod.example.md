:::tip
This ***runtime*** Result pattern is built by creating a runtime validation schema and then inferring the type from it. 
This pattern is good when you also need to do unit testing, because you can validate the schema at runtime inside tests.

If you don't need to do unit testing, you can consider using [Ts Result](/item/util-ts-result) pattern, that is simpler.
:::


Result is a Zod Schema with a discriminated union on "status", that is equivalent to this manual code:

```ts
import { z } from 'zod';

const myResult = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: z.object({ name: z.string() }),
  }),
  z.object({
    status: z.literal("error"),
    code: z.enum(["FETCH_FAILED", "INVALID_DATA", "UNKNOWN_ERROR"] as const),
    message: z.string(),
  })
]);

type MyResult = z.infer<typeof myResult>;
// ⏬
| { 
    status: 'success'; 
    data: {
      name: string;
    }
  }
| { 
    status: 'error'; 
    code: 'FETCH_FAILED' | 'INVALID_DATA' | 'UNKNOWN_ERROR';
    message: string;
  }
```

that can be created with 

```ts
const schemaMyResult = schemaResult(
  schemaResultSuccess(
    // pass only the `data` schema
    z.object({ name: z.string() })
  ),
  schemaResultError(
    // pass only the `code` options
    ['FETCH_FAILED', 'INVALID_DATA', 'UNKNOWN_ERROR'] as const
  ),
);

type MyResult = InferResult<typeof schemaMyResult>;
```


**Basic Usage**  

```ts
import z from 'zod';

import {
  schemaResult,
  schemaResultSuccess,
  schemaResultError,
  type InferResult,
  getResultData,
} from './ts-result-zod';

// 1. create a result + infer type

const schemaFn1Result = schemaResult(
  schemaResultSuccess(z.object({ name: z.string() })),
  schemaResultError(['FETCH_FAILED', 'INVALID_DATA', 'UNKNOWN_ERROR'] as const),
);
type Fn1Result = InferResult<typeof schemaFn1Result>;

// 2. implement a function that returns the result

const fn1 = async (): Promise<Fn1Result> => {

  try {

    // do fetch
    const result = await fetch('https://api.example.com');

    // if fetch status is not ok...
    if (!result.ok) {
      return {
        status: 'error',
        code: 'FETCH_FAILED',
        message: 'Fetch status is not ok: ' + result.status,
      };
    }

    // if fetch status is ok...

    // extract the expected success.data shape schema
    const dataSchema = getResultData(schemaFn1Result).successData;

    // check that data has expected shape
    const parsed = dataSchema.safeParse(await result.json());

    // if invalid data
    if (!parsed.success) {
      return {
        status: 'error',
        code: 'INVALID_DATA',
        message: 'Invalid data, maybe the API return type is changed and you need to adapt your code',
      };
    }

    // if valid data
    return {
      status: 'success',
      data: parsed.data,
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

// 3. use

// NOTE: in this orchestrator function we don't need to try catch

async function main() {

  // run the fn
  const result = await fn1();

  // check the discriminated union on "status"...

  // if error...
  if (result.status === 'error') {

    if (result.code === 'FETCH_FAILED') {
      console.log(result.message);
    }
    else if (result.code === 'INVALID_DATA') {
      console.log(result.message);
    }
    else /*if (result.code === 'UNKNOWN_ERROR') */ {
      console.log(result.message);
    }

    return;
  }

  // if success...
  const data = result.data;
  {
    name: string
  }
}

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


// 1. create result

const simpleResult = schemaResult(
  schemaResultSuccess(z.object({ name: z.string(), age: z.number() })),
  schemaResultError(['MY_ERROR_CODE', 'UNKNOWN_ERROR'] as const),
);

// 2. infer types

// full type

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

// only success type

type SimpleResultSuccess = InferResultSuccess<typeof simpleResult>;
// ⏬
{
  status: "success";
  data: {
    name: string;
    age: number;
  };
}

// only error type

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

// 1. define first result

const simpleResult = schemaResult(
  schemaResultSuccess(z.object({ name: z.string(), age: z.number() })),
  schemaResultError(['MY_ERROR_CODE', 'UNKNOWN_ERROR'] as const),
);

// 2. define second result that wrap the first

const wrappedResult = schemaResult(
  schemaResultSuccess(
    z.object({
      simpleData: getResultData(simpleResult).successData,// this is the `data` schema
      extraInfo: z.string(),
    }),
  ),
  schemaResultError([
    'INVALID_INPUT',
    ...getResultData(simpleResult).errorCodes // this is the `code` options
  ] as const),
);

// 3. infer types of the wrapped result

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


// 4. use it

const fnWrapped = async (): Promise<WrappedResult> => {
  // ...
}

```