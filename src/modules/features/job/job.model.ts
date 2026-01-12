import z from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { JOB } from "./job.constants";

const SalaryConfigSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  currency: z.string().default("Ruppees"),
  period: z.enum(JOB.SALARY.PERIODS._).default(JOB.SALARY.PERIODS.YEARLY),
  negotiable: z.boolean().default(false),
});

const JobMetaSchema = z.record(z.string(), z.any());

export const JobModel = modelSchema({
  id: z.uuidv4("Invalid Job Id"),
  title: z
    .string("Invalid Title")
    .min(JOB.TITLE.LENGTH.MIN, { error: "Title too short" }),
  slug: z.string("Invalid Slug").nullable(),
  type: z.enum(JOB.TYPES._, { error: "Invalid Job Type" }),
  location: z.string("Invalid Location").nullable(),
  isRemote: z.boolean("Invalid Remote Flag"),
  salaryConfig: SalaryConfigSchema.optional().nullable(),
  meta: JobMetaSchema.optional().nullable(),
  description: z.string("Invalid Description"),
  companyName: z.string("Invalid Company Name"),
  companyLogo: z.url("Invalid Logo URL").nullable(),
  applyLink: z.url("Invalid Apply Link"),
  status: z.enum(JOB.STATUS._, { error: "Invalid Status" }),
  expiresAt: z.int("Invalid Expiry Date").positive().nullable(),
});

export type JobAttributes = z.infer<typeof JobModel.dbSchema>;
export type JobCreationAttributes = Omit<
  z.infer<typeof JobModel.dbFields>,
  "id" | "slug"
>;

export const Job = defineModel<JobAttributes, JobCreationAttributes>(
  db,
  "Job",
  {
    id: { ...PRIMARY_ID },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      values: JOB.TYPES._,
      defaultValue: JOB.TYPES.FULL_TIME,
    },
    location: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    isRemote: { type: DataTypes.BOOLEAN, defaultValue: false },
    salaryConfig: { type: DataTypes.JSONB, allowNull: true, defaultValue: {} },
    description: { type: DataTypes.TEXT, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: false },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { isUrl: true },
    },
    applyLink: { type: DataTypes.STRING, allowNull: false },
    meta: { type: DataTypes.JSONB, allowNull: true, defaultValue: {} },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: JOB.STATUS._,
      defaultValue: JOB.STATUS.DRAFT,
      validate: { isIn: [JOB.STATUS._] },
    },
    expiresAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue("expiresAt");
        return rawValue ? parseInt(rawValue as string, 10) : null;
      },
    },
  }
);

// Hooks
Job.beforeValidate(async (job: any) => {
  if (!job.slug && job.title) {
    let baseSlug = job.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const randomSuffix = Math.random().toString(36).substring(2, 6);
    job.slug = `${baseSlug}-${randomSuffix}`;
  }
});

export type JobInstance = InstanceType<typeof Job>;
