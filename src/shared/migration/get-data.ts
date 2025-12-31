import fs from "fs/promises";
import path from "path";

const OLD_DATA_DIR = "./src/shared/migration/data";

async function listDir(dir: string) {
  return await fs.readdir(dir);
}

export const getDataJsons = async () => {
  const lists = await listDir(OLD_DATA_DIR);
  const jsons: Record<string, any> = {};
  for (const f of lists) {
    const fText = await (
      await fs.readFile(path.join(OLD_DATA_DIR, f))
    ).toString();
    const key = f.replace("data", "").replace(".json", "");
    jsons[key] = JSON.parse(fText);
  }

  return jsons;
};
