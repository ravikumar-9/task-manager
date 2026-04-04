import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
  strict: true,
  verbose: true,
} satisfies Config