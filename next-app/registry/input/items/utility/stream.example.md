```ts
// express handler example

import express from 'express';
import { openai } from 'ai/openai';

import { convertWebStreamToNodeStream } from './stream';


const app = express();
app.get('/stream', async (req, res) => {

  // ai sdk stream
  const aiStream = openai.createChatCompletion({ mode: 'XXX', stream: true });

  // convert WebStream to Node ReadableStream
  const nodeRs = await convertWebStreamToNodeStream(aiStream.body);

  // ...

})
```

```ts
// vitest example

import { it, expect } from 'vitest';

import { readWebStreamIntoString } from './stream';

it('should convert WebStream to string', async () => {

  // ai sdk stream
  const aiStream = openai.createChatCompletion({ mode: 'XXX', stream: true });

  // convert the stream to a single string
  const resultString = await readWebStreamIntoString(aiStream.body);

// check the result
  expect(resultString).toBe('hello');
})
```