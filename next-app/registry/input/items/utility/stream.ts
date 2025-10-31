import { Readable } from 'stream';

/**
 * Convert a `Web ReadableSream` to a `Node ReadableStream`
 */
export const convertWebStreamToNodeStream = async (webStream: ReadableStream<Uint8Array>) => {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null); // Chiude lo stream
      } else {
        this.push(value); // Passa il chunk
      }
    },
  });
};

/**
 * Read a `Web ReadableSream` into a string
 */
export const readWebStreamIntoString = async (webStream: ReadableStream) => {
  let output = "";
  const nodeRs = await convertWebStreamToNodeStream(webStream);
  for await (const chunk of nodeRs) {
    output += chunk;
  }
  return output;
};