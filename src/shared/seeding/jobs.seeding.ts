import { connectDB, disconnectDB } from "@config/database";
import { Job } from "@modules/features/job/job.model";
import fs from "fs";
import path from "path";

const seedJobs = async () => {
  const _jobs: any[] = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "./data.seed/jobs-data.json"))
      .toString(),
  );

  await Job.bulkCreate(_jobs);

  console.log("Jobs seeded.");
};

const run = async () => {
  await connectDB();

  await seedJobs();

  await disconnectDB();
};

run();
