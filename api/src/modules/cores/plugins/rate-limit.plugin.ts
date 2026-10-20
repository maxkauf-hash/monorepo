import rateLimit from "@fastify/rate-limit";
import fp from "fastify-plugin";

export const rateLimitPlugin = fp(
  async (fastify) => {
    await fastify.register(rateLimit, {
      max: fastify.config.RATE_LIMIT_MAX,
      timeWindow: fastify.config.RATE_LIMIT_TIME_WINDOW,
    });
  },
  { name: "rate-limit", dependencies: ["config"] },
);
