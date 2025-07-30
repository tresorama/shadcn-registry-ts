import clipboardy from 'clipboardy';

export const clipboard = {
  copy: (text: string) => clipboardy.writeSync(text),
};