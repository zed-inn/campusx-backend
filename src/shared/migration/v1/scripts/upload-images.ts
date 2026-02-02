import fs from "fs";
import { diskFileToMulterFile } from "./file-to-multer";
import { UploadService } from "@modules/features/upload/upload.service";

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
  .map((x: string) => x.replace("/uploads/", ""));

const fileUrls = imageUrls.map((i) => `./src/shared/migration/images.old/${i}`);

const files = fileUrls.map((f) => diskFileToMulterFile(f));

const run = async () => {
  const fileMap: Record<string, string> = {};
  for (const f of files) {
    const file = f as any;
    if (
      file.originalname ===
      "1767418008559_04788eb0_bf9e_4e68_9b6f_5cd8fa68fda0_compressed_1767418006796.jpeg"
    )
      continue;
    try {
      const newUrl = await UploadService.putObjectInS3Bucket(file);
      fileMap[file.originalname] = newUrl;
    } catch {
      console.log(`Skipped ${file.originalname}`);
    }
  }

  fs.writeFileSync(
    "./src/shared/migration/url-mapped.json",
    JSON.stringify(fileMap)
  );
};

run();
