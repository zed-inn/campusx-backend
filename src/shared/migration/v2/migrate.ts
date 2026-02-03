import path from "path";
import fs from "fs";
import {
  fieldsOldToNewMap,
  InstituteOldSchema,
  takeFieldsSchema,
} from "./schema";
import { connectDB, disconnectDB } from "@config/database";
import { Institute, InstituteSchema } from "@modules/core/institutes";
import { Sanitize } from "@shared/utils/sanitize";

const getOldInstitutes = async () => {
  const institutesDataRaw = fs
    .readFileSync(path.join(__dirname, "./data.old/institutes.json"))
    .toString()
    .replaceAll("\\\\", "\\");

  const institutesData = (JSON.parse(institutesDataRaw) as any[]).map((x) => {
    try {
      return InstituteOldSchema.parse(x);
    } catch (error) {
      console.log(x);
      console.log(error);
      process.exit(1);
    }
  });

  return institutesData;
};

const migrate = async () => {
  const oldInstitutes = await getOldInstitutes();

  let i = 0;
  console.log();
  for (const oldInst of oldInstitutes) {
    const aisheCode = oldInst.aishe_code;

    const inst = await Institute.findOne({ where: { aisheCode } });
    if (!inst) continue;
    const _inst = inst.plain;

    const oldPicks = takeFieldsSchema.parse(oldInst);
    const oldPicksConvert: Record<string, unknown> = {};

    for (let [key, value] of Object.entries(oldPicks)) {
      const _k = key as keyof typeof fieldsOldToNewMap;
      const newKey = fieldsOldToNewMap[_k];
      if (!value || !_inst[newKey]) continue;
      try {
        let val: unknown = value;
        if (
          newKey === "yearOfEstablishment" &&
          value !== "NaN" &&
          !isNaN(value as any)
        )
          val = parseInt(value);
        else if (newKey === "website" || newKey === "imageUrl")
          val = Sanitize.sanitizeUrl(value);

        if (isNaN(val as any)) throw new Error("Nan value");

        oldPicksConvert[newKey] = InstituteSchema.shape[newKey].parse(val);
      } catch {}
    }

    await inst.update(oldPicksConvert);
    process.stdout.write(`\r${++i}/${oldInstitutes.length} Done`);
  }
  console.log();
};

const run = async () => {
  await connectDB();
  await migrate();
  await disconnectDB();
};

run();
