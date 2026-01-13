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
  source: z
    .object({
      originalId: z.string().nullable(),
      name: z.string().nullable(),
      url: z.string().nullable(),
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
      name: z.string("Invalid Company Name"),
      logo: z.url("Invalid Logo URL").nullable(),
      website: z.url("Invalid company website").nullable(),
      industry: z.url("Invalid Company Industry").nullable(),
      foundedYear: z.string().nullable(),
      meta: JobMetaSchema.optional().nullable(),
    })
    .nullable(),
  applyLink: z.url("Invalid Apply Link").nullable(),
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
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      values: JOB.TYPES._,
      defaultValue: JOB.TYPES.FULL_TIME,
    },
    locations: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
    isRemote: { type: DataTypes.BOOLEAN, defaultValue: false },
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
