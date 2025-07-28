```ts
import { 
  getRandomString,
  getRandomString2, 
  getRandomInteger, 
  getRandomArrayItem, 
  getRandomColor, 
  getRandomImage,
  getRandomDateInRange,
} from './random';

// getRandomString
getRandomString(); // 1642345678-12345

// getRandomString2
getRandomString2() // 12345

// getRandomInteger(min, max)
getRandomInteger(1, 10); // 1
getRandomInteger(1, 10); // 2
getRandomInteger(1, 10); // 10

// getRandomArrayItem(any[])
getRandomArrayItem([1, 2, 3]); // 2
getRandomArrayItem([1, 2, 3]); // 3

// getRandomColor
getRandomColor(); // total random { h: 120, s: 100, l: 50, hsl: 'hsl(120 100% 50% )' }
getRandomColor({h: 50}); // fixed h { h: 50, s: 100, l: 50, hsl: 'hsl(50 100% 50% )' }
getRandomColor({h: 50, s: 50}); // fixed h and s { h: 50, s: 50, l: 50, hsl: 'hsl(50 50% 50% )' }
getRandomColor({h: 50, l: 50}); // fixed h and l { h: 50, s: 50, l: 50, hsl: 'hsl(50 50% 50% )' }

// getRandomImage
getRandomImage(); // https://picsum.photos/900/700?random=1
getRandomImage({ w: 600, h: 400 }); // https://picsum.photos/600/400?random=2

// getRandomDateInRange
getRandomDateInRange(new Date('2022-01-01'), new Date('2022-12-31')); // Date 2022-08-01

```
