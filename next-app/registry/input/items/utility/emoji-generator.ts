/**
 * Source: http://localhost:3000
 */

import getRandomEmoji from '@sefinek/random-emoji';

type EmojyItem = ReturnType<typeof getRandomEmoji.emojis>['content'];
const MAX_ATTEMPT = 100;

export const randomEmojiCreator = {
  /** in memory state that track every emojy already used */
  emojiCreatedNames: new Set<EmojyItem>(),
  /** Generate a random emoji, that is not already used */
  generateOne: () => {
    let attempt = 0;
    while (true) {
      attempt++;
      const outputEmoji = getRandomEmoji.emojis().content;

      // check if emoji is already used
      const isAlreadyUsed = randomEmojiCreator.emojiCreatedNames.has(outputEmoji);

      if (!isAlreadyUsed) {
        randomEmojiCreator.emojiCreatedNames.add(outputEmoji);
        return outputEmoji;
      }

      if (isAlreadyUsed && attempt === MAX_ATTEMPT) {
        randomEmojiCreator.emojiCreatedNames.add(outputEmoji);
        return outputEmoji;
      }

      // othrwise, try again
    }
  }
};