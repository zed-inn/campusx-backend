import fs from "fs/promises";
import path from "path";
import { InstituteCreateSchema } from "../dtos/service/institute-create.dto";
import { Institute } from "../institute.model";
import { connectDB } from "@config/database";

const run = async () => {
  await connectDB();

  const data = (
    await fs.readFile(path.join(__dirname, "./data/data.json"))
  ).toString();

  try {
    const parsedData = (JSON.parse(data) as any[]).map((x) =>
      InstituteCreateSchema.parse(x)
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

run();
