import crypto from "node:crypto";

export const getSecretValue = (
  username: string,
  clientId: string,
  clientSecret: string
) =>
  crypto
    .createHmac("sha256", clientSecret)
    .update(`${username}${clientId}`)
    .digest("base64");
