import helmet from "@fastify/helmet";
import fp from "fastify-plugin";

export const helmetPlugin = fp(
  async (fastify) => {
    await fastify.register(helmet);
  },
  { name: "helmet", dependencies: ["config"] },
);
