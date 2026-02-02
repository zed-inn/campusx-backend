import fs from "fs";
import path from "path";
import { z } from "zod";
import { FILES } from "../mapping/data-files";
import { DataDtoMap } from "../mapping/dto-data-map";

export type OldDataCollection = {
  [K in keyof typeof DataDtoMap]: z.infer<(typeof DataDtoMap)[K]>[];
};

const DATA_DIR = path.join(__dirname, "../data.old");

export function getOldData(): OldDataCollection {
  console.log("Loading old data from:", DATA_DIR);

  const results: Partial<OldDataCollection> = {};

  for (const key of FILES) {
    const fileName = `${key}-data.json`;
    const filePath = path.join(DATA_DIR, fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(
        `Warning: File not found '${fileName}'. Returning empty array.`
      );
      results[key as keyof OldDataCollection] = [];
      continue;
    }

    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(rawData);

      const itemSchema = DataDtoMap[key as keyof typeof DataDtoMap];

      const arraySchema = z.array(itemSchema);

      const parsedData = arraySchema.parse(jsonData);

      results[key as keyof OldDataCollection] = parsedData as any;
    } catch (error) {
      console.error(`Error processing ${fileName}:`);
      if (error instanceof z.ZodError) {
        console.error(JSON.stringify(z.treeifyError(error), null, 2));
      } else {
        console.error(error);
      }
      throw new Error(`Data migration failed at ${key}`);
    }
  }

  console.log("Old Data Loaded.");
  return results as OldDataCollection;
}
