:::tip
This ***type-only*** Result pattern is good when you don't need to do unit testing, because you already trust the code that you are using.  

If you need to do unit testing, it's better to use [Ts Result Zod](/item/util-ts-result-zod) pattern (that force to create runtime validation schema that you can use inside tests).
:::

Result is just a typescript type, that is a discriminated union on "status", with this shape:

```ts
type Result<TSuccessData, TErrorCodes> = (
  | { 
      status: 'success'; 
      data: TSuccessData;
    }
  | { 
      status: 'error'; 
      code: TErrorCodes | 'UNKNOWN_ERROR';
      message: string;
  }
)
```


### Basic Usage

```ts
import type { Result } from './ts-result';

// 1. create type

type Fn1Result = Result<
  // success.data
  { name: string; }, 
  // error.code
  'FETCH_FAILED' | 'INVALID_DATA_FROM_API'
>;

// 2. implement a fn that return that Result

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
    
    // define the expected success.data shape schema
    const dataSchema = z.object({ name: z.string() });

    // check that data has expected shape
    const parsed = dataSchema.safeParse(await result.json());
    
    // if invalid data
    if (!parsed.success) {
      return {
        status: 'error',
        code: 'INVALID_DATA_FROM_API',
        message: 'Invalid data, maybe the API return type is changed and you need to adapt your code',
      }
    }

    // if is valid
    return {
      status: 'success',
      data: parsed.data,
    };

  }
  catch (error) {
    // for error unexpected

    // NOTE: 
    // Wait? I haven't specified that the error branch can have "UNKNOWN_ERROR"??
    // code "UNKNOWN_ERROR" is hardcoded in the Result definition so you don't need to add it

    return {
      status: 'error',
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong',
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
    else if (result.code === 'INVALID_DATA_FROM_API') {
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

### ResultAlwaysSuccess

Use this if you know that error is not possible, or if you want to treat error as success.

```ts
import type { ResultAlwaysSuccess } from './ts-result';

// 1. create type

type Fn2Result = ResultAlwaysSuccess<{ name: string; }>;

// 2. use

const fn2 = async (): Promise<Fn2Result> => {

  // ts force you to return a value with status === 'success'

  // ... do your work

  return {
    status: 'success',
    data: { name: 'John Doe' },
  };
};
```

### Infer Types and Wrap Types

```ts
import type { Result, InferResultSuccess, InferResultError } from './ts-result';

// 1. create first result

type SubFnResult = Result<
  { name: string; }, 
  'FETCH_FAILED'
>;

type SubFnResultSuccess = InferResultSuccess<SubFnResult>;
type SubFnResultError = InferResultError<SubFnResult>;

const subFn = async (): Promise<SubFnResult> => {
  // omitted
}

// 2. Create a new result that extends the first result

type WrappedResult = Result<
  SubFnResultSuccess['data'],
  "INVALID_INPUT" | SubFnResultError['code']
>;

// 4. use


const wrappedFn = async (text: string): Promise<WrappedResult> => {

  try {

    // if invalid input -> return `INVALID_INPUT` error code
    if (text.length < 3) {
      return {
        status: 'error',
        code: 'INVALID_INPUT',
        message: 'Invalid input',
      };
    }

    // if error in sub fn -> return sub fn error
    const subFnResult = await subFn();
    if (subFnResult.status === 'error') {
      return subFnResult;
    }

    // if success in sub fn -> return sub fn success
    return {
      status: 'success',
      data: subFnResult.data,
    };

  }
  catch (error) {
    // if error unexpected -> return `UNKNOWN_ERROR` error code
    return {
      status: 'error',
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong',
    };

  }
};

```

### Add Zod Schema

:::tip
There is also a dedicated utility [Ts Result Zod](/item/util-ts-result-zod), that is more complete.
But here is a manual way to do it.
:::


```ts
import type { Result } from './ts-result';
import { z } from 'zod';

const successDataSchema = z.object({
  name: z.string(),
  age: z.number(),
})

type MyResult = Result<
  z.infer<typeof successDataSchema>, 
  'FETCH_FAILED' | 'INVALID_DATA_FROM_API'
>;

const fn = async (): Promise<MyResult> => {
  try {

    // do fetch
    const response = fetch(...);

    // if status not ok...
    if (!response.ok) {
      return {
        status: 'error',
        code: 'FETCH_FAILED',
        message: '...',
      }
    }

    // if status ok...

    // check that data has expected shape
    const parsed = successDataSchema.safeParse(await response.json());

    // if invalid data
    if (!parsed.success) {
      return {
        status: 'error',
        code: 'INVALID_DATA_FROM_API',
        message: '...',
      }
    }

    // if valid data
    return {
      status: 'success',
      data: parsed.data,
    }
  }
  catch (error) {

    // if unexpected error
    return {
      status: 'error',
      code: 'UNKNOWN_ERROR',
      message: '...',
    }
  }
}

```