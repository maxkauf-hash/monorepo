import { createHash, timingSafeEqual } from "node:crypto";

const SHA256_HEX_LENGTH = 64;
const SHA256_HEX_PATTERN = /^[a-f0-9]{64}$/;

export function hashApiKey(plain: string): string {
  return createHash("sha256").update(plain, "utf8").digest("hex");
}

export function extractBearerApiKey(
  authorizationHeader: string | undefined,
): string | null {
  if (!authorizationHeader?.trim()) {
    return null;
  }

  const match = /^Bearer\s+(.+)$/i.exec(authorizationHeader.trim());
  if (!match) {
    return null;
  }

  const key = match[1]!.trim();
  return key.length > 0 ? key : null;
}

export function isValidApiKey(
  expectedHashHex: string,
  providedPlain: string,
): boolean {
  if (!providedPlain || !SHA256_HEX_PATTERN.test(expectedHashHex)) {
    return false;
  }

  const providedHashHex = hashApiKey(providedPlain);
  if (providedHashHex.length !== SHA256_HEX_LENGTH) {
    return false;
  }

  const provided = Buffer.from(providedHashHex, "hex");
  const expected = Buffer.from(expectedHashHex, "hex");

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
}
