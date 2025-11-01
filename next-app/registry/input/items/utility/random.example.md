**getRandomString**

```ts
import { getRandomString } from './random';

getRandomString(); // 1642345678-12345
```

**getRandomString2**

```ts
import { getRandomString2 } from './random';

getRandomString2() // 12345
```

**getRandomInteger**

```ts
import { getRandomInteger } from './random';

getRandomInteger(1, 10); // 1
getRandomInteger(1, 10); // 2
getRandomInteger(1, 10); // 10
```

**getRandomArrayItem**

```ts
import { getRandomArrayItem } from './random';

getRandomArrayItem([1, 2, 3]); // 2
getRandomArrayItem([1, 2, 3]); // 3
```

**getRandomColor**

```ts
import { getRandomColor } from './random';

// total random 
getRandomColor(); 
// { h: 120, s: 100, l: 50, hsl: 'hsl(120 100% 50% )' }

// fixed h 
getRandomColor({h: 50});
// { h: 50, s: 100, l: 50, hsl: 'hsl(50 100% 50% )' }

// fixed h and s 
getRandomColor({h: 50, s: 50});
// { h: 50, s: 50, l: 50, hsl: 'hsl(50 50% 50% )' }

// fixed h and l 
getRandomColor({h: 50, l: 50});
// { h: 50, s: 50, l: 50, hsl: 'hsl(50 50% 50% )' }
```

**getRandomImage**

```ts
import { getRandomImage } from './random';

// default
getRandomImage();
// https://picsum.photos/900/700?random=1

// with fixed size
getRandomImage({ w: 600, h: 400 });
// https://picsum.photos/600/400?random=2
```

**getRandomDateInRange**

```ts
import { getRandomDateInRange } from './random';

getRandomDateInRange(
  new Date('2022-01-01'), 
  new Date('2022-12-31')
);
// Date 2022-08-01
```
