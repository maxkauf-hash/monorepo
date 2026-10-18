import type { Env } from "@/config/env.js";
import type { Database } from "@repo/database";

declare module "fastify" {
  interface FastifyInstance {
    config: Env;
    db: Database;
    verifyApiKey: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

export {};
