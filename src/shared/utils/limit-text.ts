export const limitText = (text: string, length: number = 100) => {
  if (text.length >= length) text = text.slice(0, length - 3) + "...";
  return text;
};
