import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local" });

const placeholderUrl =
  "postgresql://USER:PASSWORD@localhost:5432/ainovahealth?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? placeholderUrl,
  },
});
