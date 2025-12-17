import { z } from "zod";

export class Parse {
  static pageNum = (x: any) => z.coerce.number().positive().default(1).parse(x);

  static id = (x: any) => z.uuidv4().parse(x);
}
