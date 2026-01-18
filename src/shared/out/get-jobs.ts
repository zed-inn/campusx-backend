import { connectDB, disconnectDB } from "@config/database";
import { Job } from "@modules/features/job/job.model";
import fs from "fs";
import path from "path";

const getJobsInJson = async () => {
  const jobs = await Job.findAll();

  const _jobs = jobs.map((j) => j.plain);

  fs.writeFileSync(
    path.join(__dirname, "./data.old/jobs-data.json"),
    JSON.stringify(_jobs),
  );
};

const run = async () => {
  await connectDB();

  await getJobsInJson();

  await disconnectDB();
};

run();
