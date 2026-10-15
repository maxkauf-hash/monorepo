import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";

const healthResponseSchema = Type.Object({
  status: Type.Literal("ok"),
});

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/health",
    {
      schema: {
        response: {
          200: healthResponseSchema,
        },
      },
    },
    async () => ({ status: "ok" as const }),
  );
};
