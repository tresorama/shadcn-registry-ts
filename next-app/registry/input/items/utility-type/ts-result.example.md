```ts
import type {
  Result,
  ResultAlwaysSuccess,
  InferResultSuccess,
  InferResultError
} from './ts-result';

// ========================
// Result
// ========================

type Fn1Result = Result<{ name: string; }, 'FETCH_FAILED'>;

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

// ========================
// ResultAlwaysSuccess
// ========================

type Fn2Result = ResultAlwaysSuccess<{ name: string; }>;
const fn2 = async (): Promise<Fn2Result> => {

  // ts force you to return a value with status === 'success'
  // use this if you know that error is not possible, or if you want to treat error as success

  // ... do your work

  return {
    status: 'success',
    data: { name: 'John Doe' },
  };
};


// ========================
// Infer Types
// ========================

type Fn1ResultSuccess = InferResultSuccess<Fn1Result>;
type Fn1ResultError = InferResultError<Fn1Result>;

type Fn3Result = Result<
  Fn1ResultSuccess['data'],
  "INVALID_INPUT" | Fn1ResultError['code']
>;

const fn3 = async (text: string): Promise<Fn3Result> => {

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
    const fn1Result = await fn1();
    if (fn1Result.status === 'error') {
      return fn1Result;
    }

    // if success in sub fn -> return sub fn success
    return {
      status: 'success',
      data: fn1Result.data,
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