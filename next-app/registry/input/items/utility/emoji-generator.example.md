**randomEmojiCreator**

```ts
import { randomEmojiCreator } from './emoji-generator'

// NOTE: Every time you call generateOne, it will return a different random emoji.
// Internally, it stores previously used emoji in memory, in order to not return them again, to avoid duplicate.

// There is a MAX_ATTEMPT limit of 100 used for that, if it's reached and the emoji is already used, it will return it anyway (duplicate).
// NOTE: You can change the MAX_ATTEMPT limit to something else, directly in the utility file.

randomEmojiCreator.generateOne(); //  '😏
randomEmojiCreator.generateOne(); //  '👨'
randomEmojiCreator.generateOne(); //  '😎'
// ...
```