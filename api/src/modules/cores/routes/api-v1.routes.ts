import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";

const pingResponseSchema = Type.Object({
  ok: Type.Literal(true),
});

export const apiV1Routes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("onRequest", async (request, reply) => {
    await fastify.verifyApiKey(request, reply);
  });

  fastify.get(
    "/ping",
    {
      schema: {
        response: {
          200: pingResponseSchema,
        },
      },
    },
    async () => ({ ok: true as const }),
  );
};
