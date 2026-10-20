import fp from "fastify-plugin";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorHandlerPlugin = fp(
  async (fastify) => {
    fastify.setNotFoundHandler((_request, reply) => {
      reply.code(404).send({
        statusCode: 404,
        error: "NOT_FOUND",
        message: "Route not found",
      });
    });

    fastify.setErrorHandler(
      (
        error: FastifyError,
        request: FastifyRequest,
        reply: FastifyReply,
      ) => {
        request.log.error({ err: error }, "Request error");

        if (error.validation) {
          return reply.code(400).send({
            statusCode: 400,
            error: "VALIDATION_ERROR",
            message: "Validation failed",
            details: error.validation,
          });
        }

        const statusCode = error.statusCode ?? 500;
        const code = error.code ?? "INTERNAL_ERROR";
        const exposeDetails = fastify.config.EXPOSE_ERROR_DETAILS;
        const message =
          statusCode >= 500 && !exposeDetails
            ? "Internal Server Error"
            : error.message;

        return reply.code(statusCode).send({
          statusCode,
          error: code,
          message,
        });
      },
    );
  },
  { name: "error-handler", dependencies: ["config"] },
);
