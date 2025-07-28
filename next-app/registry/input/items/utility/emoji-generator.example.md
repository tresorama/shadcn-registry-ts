```ts
import { randomEmojiCreator } from './emoji-generator'

// NOTE: 
// Every time you call generateOne, it will return a different emoji.
// Internally, it stores previously used emoji in memory, in order to not return them again.
randomEmojiCreator.generateOne(); //  '👨‍👩‍👧‍👦'
randomEmojiCreator.generateOne(); //  '😏
randomEmojiCreator.generateOne(); //  '👨'
randomEmojiCreator.generateOne(); //  '😎'
// ...
```