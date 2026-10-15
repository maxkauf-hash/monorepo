import { Type, type Static } from "@sinclair/typebox";
import envSchema from "env-schema";

const schema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  HOST: Type.String({ default: "0.0.0.0" }),
  DATABASE_URL: Type.String({ minLength: 1 }),
  API_KEY_HASH: Type.String({
    minLength: 64,
    maxLength: 64,
    pattern: "^[a-f0-9]{64}$",
  }),
  LOG_LEVEL: Type.Union(
    [
      Type.Literal("trace"),
      Type.Literal("debug"),
      Type.Literal("info"),
      Type.Literal("warn"),
      Type.Literal("error"),
      Type.Literal("fatal"),
    ],
    { default: "info" },
  ),
  CORS_ORIGIN: Type.String({ default: "http://localhost:3000" }),
  RATE_LIMIT_MAX: Type.Number({ default: 100 }),
  RATE_LIMIT_TIME_WINDOW: Type.Number({ default: 60_000 }),
  EXPOSE_ERROR_DETAILS: Type.Boolean({ default: false }),
});

export type Env = Static<typeof schema>;

export const env = envSchema<Env>({
  schema,
  dotenv: true,
});
