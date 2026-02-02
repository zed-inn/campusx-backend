import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";

const forums = JSON.parse(
  fs.readFileSync("./src/shared/migration/data.old/forum-data.json").toString()
);
const insights = JSON.parse(
  fs
    .readFileSync("./src/shared/migration/data.old/insight-data.json")
    .toString()
);

const imageUrls = [
  ...forums.map((f: any) => f.imageUrl),
  ...insights.map((i: any) => i.imageUrl),
]
  .filter((i: string) => typeof i === "string" && i.startsWith("/uploads"))
  .map((x: string) => `https://api.thoughtshub.agency${x}`);

fs.writeFileSync(
  "./src/shared/migration/image-urls.txt",
  JSON.stringify(imageUrls)
);

const TARGET_DIR = "./src/shared/migration/images.old";
const CONCURRENCY_LIMIT = 20;

const downloadFile = async (url: string, index: number) => {
  try {
    const urlObj = new URL(url);
    const filename = path.basename(urlObj.pathname) || `file_${index}`;
    const finalName = filename.includes(".") ? filename : `${filename}.html`;
    const destination = path.join(TARGET_DIR, finalName);

    if (fs.existsSync(destination)) {
      console.log(`[SKIP] Exists: ${url}`);
      return;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const fileStream = fs.createWriteStream(destination, { flags: "wx" });
    await finished(Readable.fromWeb(response.body as any).pipe(fileStream));

    console.log(`[DONE] ${url}`);
  } catch (error) {
    console.error(`[FAIL] ${url} -> ${(error as any).message}`);
  }
};

async function main() {
  const urls = imageUrls;

  console.log(`Found ${urls.length} URLs. Starting download...`);

  // 3. Process with Concurrency Limit
  for (let i = 0; i < urls.length; i += CONCURRENCY_LIMIT) {
    const batch = urls.slice(i, i + CONCURRENCY_LIMIT);
    const promises = batch.map((url, batchIndex) =>
      downloadFile(url, i + batchIndex)
    );
    await Promise.all(promises);
  }

  console.log("All downloads finished.");
}

main();
