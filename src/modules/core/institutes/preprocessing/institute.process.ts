import fs from "fs/promises";
import path from "path";
import { Institute } from "../institute.model";
import { connectDB, disconnectDB } from "@config/database";
import { CreateBySheetSchema } from "../dtos/institute-create.dto";

export const dataFill = async () => {
  const data = (
    await fs.readFile(path.join(__dirname, "./data/data.json"))
  ).toString();

  console.log("Institutes filling up...");
  try {
    const parsedData = (JSON.parse(data) as any[]).map((x) =>
      CreateBySheetSchema.parse(x)
    );

    let i = 0;

    for (const institute of parsedData) {
      const existing = await Institute.findOne({
        where: { aisheCode: institute.aisheCode },
      });
      if (existing) await existing.update(institute);
      else await Institute.create(institute);
      i++;
      process.stdout.write(`\r${i + 1}/${parsedData.length} Completed`);
    }
  } catch (error) {
    console.log(error);
  }
};

const run = async () => {
  await connectDB();

  await dataFill();

  await disconnectDB();
};

run();
