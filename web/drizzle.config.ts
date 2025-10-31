import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";

// Load env in dev only (skip in prod)
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "./.env.local" });
}

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/utils/supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});