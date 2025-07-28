import { describe, it, expect } from 'vitest';
import { repeatSyncFn } from '../utility-framework/vitest.utils';

import { randomEmojiCreator } from './emoji-generator';

describe('emoji-generator - randomEmojiCreator', () => {

  it('do it', () => {
    repeatSyncFn(10_000, () => {
      const emoji = randomEmojiCreator.generateOne();
      expect(emoji).toBeTypeOf('string');
    });
  });

});