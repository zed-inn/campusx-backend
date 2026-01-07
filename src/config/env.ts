import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DB_RESET: z.enum(["true", "false"]).default("false"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().default(3000),
  REDIS_URI: z.url(),
  POSTGRESQL_SERVER: z.string().default("localhost"),
  POSTGRESQL_DATABASE: z.string(),
  POSTGRESQL_USERNAME: z.string().default("postgres"),
  POSTGRESQL_PASSWORD: z.string(),
  POSTGRESQL_DATABASE_TEST: z.string(),
  JWT_SECRET: z.string(),
  BCRYPT_PASSWORD_HASH_SALT: z.coerce.number().default(10),
  REFERRAL_CODE_LENGTH: z.coerce.number().default(8),
  NODEMAILER_HOST: z.string(),
  NODEMAILER_PORT: z.coerce.number(),
  NODEMAILER_USER: z.string(),
  NODEMAILER_PASS: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  FIREBASE_CONFIG_JSON: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(_env.error));

  process.exit(1);
}

export const env = _env.data;
