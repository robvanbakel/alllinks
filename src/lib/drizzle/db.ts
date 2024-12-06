import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Environment variable: `DATABASE_URL` not set");
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql });
