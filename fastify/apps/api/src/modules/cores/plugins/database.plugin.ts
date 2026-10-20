import { db } from "@packages/database";
import fp from "fastify-plugin";

export const databasePlugin = fp(
  async (fastify) => {
    fastify.decorate("db", db);
  },
  { name: "database", dependencies: ["config"] },
);
