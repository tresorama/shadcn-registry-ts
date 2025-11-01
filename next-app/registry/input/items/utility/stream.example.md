**convertWebStreamToNodeStream**

```ts
// we use express handler for this example

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

**readWebStreamIntoString**

```ts

// we use vitest for this example

import { it, expect } from 'vitest';

import { readWebStreamIntoString } from './stream';

it('should convert WebStream to string', async () => {

  // ai sdk stream
  const aiStream = openai.createChatCompletion({ mode: 'XXX', stream: true });

  // read all the chunks of the stream into a single string
  const resultString = await readWebStreamIntoString(aiStream.body);

  // check the result
  expect(resultString).toBe('hello');
})
```