export const removeUndefined = <T extends object>(obj: T): T => {
  const cleanObj = { ...obj };

  Object.keys(cleanObj).forEach((key) => {
    if ((cleanObj as any)[key] === undefined) {
      delete (cleanObj as any)[key];
    }
  });

  return cleanObj;
};
