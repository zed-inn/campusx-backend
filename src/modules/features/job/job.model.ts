import z from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { JOB } from "./job.constants";

const SalaryConfigSchema = z.object({
  min: z.number().nullable().default(null),
  max: z.number().nullable().default(null),
  currency: z.string().nullable().default(null),
  period: z.enum(JOB.SALARY.PERIODS._).nullable().default(null),
  negotiable: z.boolean().nullable().default(null),
});

const JobMetaSchema = z.record(z.string(), z.any());

export const JobModel = modelSchema({
  id: z.uuidv4("Invalid Job Id"),
  source: z
    .object({
      originalId: z.string().nullable().default(null),
      name: z.string().nullable().default(null),
      string: z.string().nullable().default(null),
      dateFetched: z.int().positive().nullable().default(null),
    })
    .nullable()
    .default(null),
  title: z
    .string("Invalid Title")
    .min(JOB.TITLE.LENGTH.MIN, { error: "Title too short" }),
  slug: z.string("Invalid Slug").nullable().default(null),
  type: z
    .enum(JOB.TYPES._, { error: "Invalid Job Type" })
    .nullable()
    .default(null),
  locations: z
    .array(
      z.object({
        district: z.string().nullable().default(null),
        city: z.string().nullable().default(null),
        state: z.string().nullable().default(null),
        country: z.string().nullable().default(null),
        lat: z.string().nullable().default(null),
        lon: z.string().nullable().default(null),
      })
    )
    .nullable()
    .default(null),
  isRemote: z.boolean("Invalid Remote Flag").nullable().default(null),
  workMode: z.array(z.string("Invalid Work Mode")).nullable().default(null),
  salaryConfig: SalaryConfigSchema.optional().nullable().default(null),
  role: z
    .array(z.string("Invalid Role"), { error: "Invalid Role" })
    .nullable()
    .default(null),
  subRole: z
    .array(z.string("Invalid Sub Role"), { error: "Invalid Sub Role" })
    .nullable()
    .default(null),
  meta: JobMetaSchema.optional().nullable().default(null),
  description: z
    .object({
      full: z.string("Invalid full description").nullable().default(null),
      short: z.string("Invalid short description").nullable().default(null),
    })
    .nullable()
    .default(null),
  company: z
    .object({
      name: z.string("Invalid Company Name").nullable().default(null),
      logo: z.string("Invalid Logo URL").nullable().default(null),
      website: z.string("Invalid company website").nullable().default(null),
      industry: z.string("Invalid Company Industry").nullable().default(null),
      foundedYear: z.string().nullable().default(null),
      meta: JobMetaSchema.nullable().default(null),
    })
    .nullable()
    .default(null),
  applyLink: z.string("Invalid Apply Link").nullable().default(null),
  status: z
    .enum(JOB.STATUS._, { error: "Invalid Status" })
    .nullable()
    .default(null),
  expiresAt: z.int("Invalid Expiry Date").positive().nullable().default(null),
  requirements: z
    .object({
      relevantSkills: z.array(z.string()).nullable().default(null),
      relevantDegrees: z.array(z.string()).nullable().default(null),
      targetColleges: z.array(z.string()).nullable().default(null),
      isCampusDrive: z.boolean().nullable().default(null),
      meta: JobMetaSchema.optional().nullable().default(null),
    })
    .nullable()
    .default(null),
  datePosted: z.int().positive().nullable().default(null),
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
    source: { type: DataTypes.JSONB, allowNull: true, defaultValue: null },
    title: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: true, unique: true },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      values: JOB.TYPES._,
      defaultValue: JOB.TYPES.FULL_TIME,
    },
    locations: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
    isRemote: { type: DataTypes.BOOLEAN, defaultValue: true },
    salaryConfig: { type: DataTypes.JSONB, allowNull: true, defaultValue: {} },
    workMode: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    subRole: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    description: { type: DataTypes.JSONB, allowNull: true, defaultValue: null },
    company: { type: DataTypes.JSONB, allowNull: true, defaultValue: null },
    applyLink: { type: DataTypes.STRING, allowNull: true },
    meta: { type: DataTypes.JSONB, allowNull: true, defaultValue: {} },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: JOB.STATUS._,
      defaultValue: JOB.STATUS.DRAFT,
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
    datePosted: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue("datePosted");
        return rawValue ? parseInt(rawValue as string, 10) : null;
      },
    },
    requirements: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null,
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
