import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@config/aws/s3";
import { env } from "process";
import { v4 as uuidv4 } from "uuid";
import { UPLOAD } from "./upload.constants";
import { AppError } from "@shared/errors/app-error";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";

export type File = Express.Multer.File;
export type FileBuffer = Buffer<ArrayBufferLike>;

class _UploadService {
  filterByMimeType = (file: File) => {
    if (!UPLOAD.MIME_TYPES.ALLOWED._.includes(file.mimetype as any))
      throw new AppError("Only Images are allowed.", 400);
  };

  filterByDetectedType = async (file: File) => {
    const type = await fileTypeFromBuffer(file.buffer);

    if (!type || !type.mime.startsWith("image/"))
      throw new AppError("File is not a valid image.", 400);

    return type;
  };

  filterTruest = async (file: File) => {
    this.filterByMimeType(file);
    return await this.filterByDetectedType(file);
  };

  putObjectInS3Bucket = async (file: File) => {
    const detected = await this.filterTruest(file);
    const key = `uploads/${uuidv4()}.${detected.ext}`;
    const compressedBuffer = await this.compressImage(file.buffer);

    await s3.send(
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
        Body: compressedBuffer,
        ContentType: file.mimetype,
      })
    );

    const url = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    return url;
  };

  compressImage = async (buffer: FileBuffer) => {
    let outputBuffer;
    for (
      let quality = UPLOAD.IMAGE.QUALITY.MAX;
      quality >= UPLOAD.IMAGE.QUALITY.MIN;
      quality -= 3
    ) {
      outputBuffer = await sharp(buffer).jpeg({ quality }).toBuffer();
      if (outputBuffer.length <= UPLOAD.IMAGE.SIZE.MAX.KB * 1024) break;
    }
    return outputBuffer as FileBuffer;
  };
}

export const UploadService = new _UploadService();
