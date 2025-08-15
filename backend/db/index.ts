import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../model/schema";
import dotenv from "dotenv";

const main = neon(process.env.DATABASE_URL!);

const db = drizzle(main, { schema });

export default db;
