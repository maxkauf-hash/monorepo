import {
  extractBearerApiKey,
  isValidApiKey,
} from "@/modules/cores/lib/api-key.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export const apiKeyPlugin = fp(
  async (fastify) => {
    fastify.decorate(
      "verifyApiKey",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const apiKey = extractBearerApiKey(request.headers.authorization);
        if (!apiKey) {
          return reply.code(401).send({
            statusCode: 401,
            error: "UNAUTHORIZED",
            message: "Invalid or missing API key",
          });
        }
        if (!isValidApiKey(fastify.config.API_KEY_HASH, apiKey)) {
          return reply.code(401).send({
            statusCode: 401,
            error: "UNAUTHORIZED",
            message: "Invalid or missing API key",
          });
        }
      },
    );
  },
  { name: "api-key", dependencies: ["config"] },
);
