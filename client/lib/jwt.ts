import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

export async function sign(payload: string, secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
