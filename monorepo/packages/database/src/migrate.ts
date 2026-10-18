import "dotenv/config";

import { migrate } from "drizzle-orm/neon-http/migrator";

import { db } from "./client.js";

await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations applied");
