import fs from "fs";
import path from "path";
import mime from "mime-types";

export const diskFileToMulterFile = (filePath: string) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return null;
    }
    const stats = fs.statSync(filePath);

    const buffer = fs.readFileSync(filePath);

    const mimetype = mime.lookup(filePath) || "application/octet-stream";

    const multerFile = {
      fieldname: "file",
      originalname: path.basename(filePath),
      encoding: "7bit",
      mimetype: mimetype,
      buffer: buffer,
      size: stats.size,
      path: filePath,
    };

    return multerFile;
  } catch (error) {
    console.error("Failed to convert disk file to Multer:", error);
    return null;
  }
};
