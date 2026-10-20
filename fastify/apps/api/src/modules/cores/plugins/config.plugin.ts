import fp from "fastify-plugin";
import { env } from "@/config/env.js";

export const configPlugin = fp(
  async (fastify) => {
    fastify.decorate("config", env);
  },
  { name: "config" },
);
