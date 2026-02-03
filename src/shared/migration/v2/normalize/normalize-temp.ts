import fs from "fs/promises";
import path from "path";

const run = async () => {
  const tempDataPath = path.join(__dirname, "../data.old/temp.txt");
  const newTempDataPath = path.join(__dirname, "../data.old/institutes.json");

  const tempData = (await fs.readFile(tempDataPath)).toString();

  const matches = tempData.match(/\{.*?\}/g) as any[];
  const newTempData = `[${matches.join(",")}]`;

  await fs.writeFile(newTempDataPath, newTempData);
  console.log("File written");
};

run();
