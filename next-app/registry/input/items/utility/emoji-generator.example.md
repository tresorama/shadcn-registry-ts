### randomEmojiCreator

Every time is called returns a random emoji.  
Internally keeps track of previously used emoji, in order to avoid duplicates.  

:::tip
The check for duplicates is limited to 100 attempts, if it's reached and the emoji is already used, it will return it anyway (duplicate).  
You can adjust the limit by changing the **MAX_ATTEMPT** value directly in the utility file.
:::
```ts
import { randomEmojiCreator } from './emoji-generator'

randomEmojiCreator.generateOne(); //  '😏
randomEmojiCreator.generateOne(); //  '👨'
randomEmojiCreator.generateOne(); //  '😎'
// ...
```