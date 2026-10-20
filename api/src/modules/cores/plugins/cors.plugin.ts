import cors from "@fastify/cors";
import fp from "fastify-plugin";

function parseCorsOrigin(value: string): boolean | string | string[] {
  if (value === "*") {
    return true;
  }

  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length === 1 ? origins[0]! : origins;
}

export const corsPlugin = fp(
  async (fastify) => {
    await fastify.register(cors, {
      origin: parseCorsOrigin(fastify.config.CORS_ORIGIN),
      credentials: true,
    });
  },
  { name: "cors", dependencies: ["config"] },
);
