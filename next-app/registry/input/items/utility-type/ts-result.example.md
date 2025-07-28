```ts
import { Result, ResultAlwaysSuccess } from './ts-result';

// Result
const fn1 = async () : Promise<Result<{ name: string }>> => {
  
  // ts force you to return a discriminated union

  // for success
  return {
    status: 'success',
    data: { name: 'John Doe' },
  }

  // or for error
  return {
    status: 'error',
    message: 'Something went wrong',
  } 
}


// ResultAlwaysSuccess
const fn2 = async () : Promise<ResultAlwaysSuccess<{ name: string }>> => {
  
  // ts force you to return a value with status === 'success'
  // use this if you know that error is not possible

  return {
    status: 'success',
    data: { name: 'John Doe' },
  }
}
```