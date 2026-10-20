import type { Env } from "@/config/env.js";
import type { FastifyServerOptions } from "fastify";

export function buildLoggerOptions(env: Env): FastifyServerOptions["logger"] {
  return {
    level: env.LOG_LEVEL,
    redact: [
      "req.headers.authorization",
      "*.password",
      "*.secret",
      "*.apiKey",
    ],
  };
}
