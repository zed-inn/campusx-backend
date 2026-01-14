import z from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { JOB } from "./job.constants";

const SalaryConfigSchema = z.object({
  min: z.number().nullable(),
  max: z.number().nullable(),
  currency: z.string().nullable(),
  period: z.enum(JOB.SALARY.PERIODS._).nullable(),
  negotiable: z.boolean().nullable(),
});

const JobMetaSchema = z.record(z.string(), z.any());

export const JobModel = modelSchema({
  id: z.uuidv4("Invalid Job Id"),
  source: z
    .object({
      originalId: z.string().nullable(),
      name: z.string().nullable(),
      string: z.string().nullable(),
      dateFetched: z.int().positive().nullable(),
    })
    .nullable(),
  title: z
    .string("Invalid Title")
    .min(JOB.TITLE.LENGTH.MIN, { error: "Title too short" }),
  slug: z.string("Invalid Slug").nullable(),
  type: z.enum(JOB.TYPES._, { error: "Invalid Job Type" }).nullable(),
  locations: z
    .array(
      z.object({
        district: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        country: z.string().nullable(),
        lat: z.string().nullable(),
        lon: z.string().nullable(),
      })
    )
    .nullable(),
  isRemote: z.boolean("Invalid Remote Flag").nullable(),
  workMode: z.array(z.string("Invalid Work Mode")).nullable(),
  salaryConfig: SalaryConfigSchema.optional().nullable(),
  role: z.array(z.string("Invalid Role"), { error: "Invalid Role" }).nullable(),
  subRole: z
    .array(z.string("Invalid Sub Role"), { error: "Invalid Sub Role" })
    .nullable(),
  meta: JobMetaSchema.optional().nullable(),
  description: z
    .object({
      full: z.string("Invalid full description").nullable(),
      short: z.string("Invalid short description").nullable(),
    })
    .nullable(),
  company: z
    .object({
      name: z.string("Invalid Company Name").nullable(),
      logo: z.string("Invalid Logo URL").nullable(),
      website: z.string("Invalid company website").nullable(),
      industry: z.string("Invalid Company Industry").nullable(),
      foundedYear: z.string().nullable(),
      meta: JobMetaSchema.nullable(),
    })
    .nullable(),
  applyLink: z.string("Invalid Apply Link").nullable(),
  status: z.enum(JOB.STATUS._, { error: "Invalid Status" }).nullable(),
  expiresAt: z.int("Invalid Expiry Date").positive().nullable(),
  requirements: z
    .object({
      relevantSkills: z.array(z.string()).nullable(),
      relevantDegrees: z.array(z.string()).nullable(),
      targetColleges: z.array(z.string()).nullable(),
      isCampusDrive: z.boolean().nullable(),
      meta: JobMetaSchema.optional().nullable(),
    })
    .nullable(),
  datePosted: z.int().positive().nullable(),
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
