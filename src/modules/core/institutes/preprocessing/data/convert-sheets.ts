import readXlsxFile, { Schema } from "read-excel-file/node";
import { FILES } from "./sheet-schema";
import path from "path";
import fs from "fs/promises";
import {
  InstituteCreateDto,
  InstituteCreateSchema,
} from "../../dtos/service/institute-create.dto";

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

const DATA_DIR = path.join(__dirname, "./sheets");

const DataSchema = InstituteCreateSchema;
type DataType = InstituteCreateDto;

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

const getInstitutes = async (page: number) => {
  const res = await fetch(
    `https://api.thoughtshub.agency/institutes?page=${page}}`
  );
  if (res.status === 200) {
    const institutes = (await res.json()).institutes;
    return institutes.filter((i: any) => i.about);
  }
  return [];
};

const checkinst = async () => {
  let page = 1;
  let tempInst: any[] = [];
  let institutes: any[] = [];
  do {
    tempInst = await getInstitutes(page);
    institutes = [...tempInst, ...institutes];
    page += 1;
    console.log(`increasing page... to ${page}`);
  } while (tempInst);

  console.log(institutes);
  console.log(page);
  console.log(institutes.length);
};

// main();
checkinst();
