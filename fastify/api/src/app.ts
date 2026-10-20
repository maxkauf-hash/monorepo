import { env } from "@/config/env.js";
import { buildLoggerOptions } from "@/lib/logger.js";
import { configPlugin } from "@/modules/cores/plugins/config.plugin.js";
import { corsPlugin } from "@/modules/cores/plugins/cors.plugin.js";
import { databasePlugin } from "@/modules/cores/plugins/database.plugin.js";
import { errorHandlerPlugin } from "@/modules/cores/plugins/error-handler.plugin.js";
import { helmetPlugin } from "@/modules/cores/plugins/helmet.plugin.js";
import { rateLimitPlugin } from "@/modules/cores/plugins/rate-limit.plugin.js";
import { healthRoutes } from "@/modules/cores/routes/health.routes.js";
import "@/types/fastify.js";
import sensible from "@fastify/sensible";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";
import { apiKeyPlugin } from "./modules/cores/plugins/api-key.plugin.js";
import { apiV1Routes } from "./modules/cores/routes/api-v1.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: buildLoggerOptions(env),
  }).withTypeProvider<TypeBoxTypeProvider>();

  await app.register(configPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(apiKeyPlugin);
  await app.register(sensible);
  await app.register(corsPlugin);
  await app.register(helmetPlugin);
  await app.register(rateLimitPlugin);
  await app.register(databasePlugin);

  await app.register(healthRoutes);
  await app.register(apiV1Routes, { prefix: "/api/v1" });

  return app;
}
