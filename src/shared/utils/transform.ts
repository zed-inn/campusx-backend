class Typecast {
  static number = (i: unknown, defaultValue: number = 0): number => {
    const num = Number(i);
    return isNaN(num) ? defaultValue : num;
  };
}

export class Transform {
  static to = Typecast;
}
