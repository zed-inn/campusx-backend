import readXlsxFile, { Schema } from "read-excel-file/node";
import { FILES } from "./sheet-schema";
import path from "path";
import { z } from "zod";
import fs from "fs/promises";

const capitalize = (x: string) =>
  x.length > 0 ? x[0]?.toUpperCase() + x.slice(1).toLowerCase() : x;

const fixName = (x: string) =>
  x
    .replace(",", ", ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(capitalize)
    .join(" ");

const DataSchema = z.object({
  aisheCode: z.string("Invalid Aishe Code"),
  name: z.string("Invalid Institute Name"),
  district: z.string("Invalid District").nullable().default(null),
  state: z.string("Invalid State").nullable().default(null),
  country: z.string("Invalid Country").nullable().default("India"),
  yearOfEstablishment: z
    .int("Invalid Year Of Establishment")
    .nullable()
    .default(null),
  website: z.url("Invalid Website").nullable().default(null),
  location: z.string("Invalid Location").nullable().default(null),
  category: z.string("Invalid Category").nullable().default(null),
  administrativeMinistry: z
    .string("Invalid Administry Ministry")
    .nullable()
    .default(null),
  standaloneType: z.string("Invalid Standalone Type").nullable().default(null),
  management: z.string("Invalid Management").nullable().default(null),
  collegeType: z.string("Invalid College Type").nullable().default(null),
  universityName: z.string("Invalid University Name").nullable().default(null),
  universityType: z.string("Invalid University Type").nullable().default(null),
});
type DataType = z.infer<typeof DataSchema>;

const DATA_DIR = path.join(__dirname, "./sheets");

const getDataJson = async (
  files: { name: string; type: string; schema: Schema }[]
): Promise<DataType[]> => {
  const dataJson: DataType[] = [];

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file.name);

    const { rows, errors } = await readXlsxFile(filePath, {
      schema: file.schema,
      transformData: (data) => data.slice(2),
    });

    rows.map((r) => {
      if (r.website)
        r.website =
          "https://" +
          r.website.replaceAll(" ", "").replace("https://", "").toLowerCase();
      try {
        DataSchema.shape.website.parse(r.website);
      } catch {
        r.website = null;
      }

      r.name = fixName(r.name);
      if (r.universityName) r.universityName = fixName(r.universityName);

      r.category = file.type;
      dataJson.push(DataSchema.parse(r));
    });
  }

  return dataJson;
};

const main = async () => {
  const instituteData = await getDataJson(FILES);

  await fs.writeFile(
    path.join(__dirname, "./data.json"),
    JSON.stringify(instituteData)
  );
};

main();
