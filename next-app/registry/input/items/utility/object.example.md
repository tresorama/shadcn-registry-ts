```ts
import { omit, pick } from './object';

// omit
const item = {
  id: 56,
  name: 'Luke',
}
const output = omit(item, ['id'])
{ 
  name: 'Luke' 
}

// pick
const item = {
  id: 56,
  name: 'Luke',
}
const output = pick(item, ['id'])
{ 
  id: 56 
}

```