// URL del reproductor de Cloudflare Stream.
// Con STREAM_KEY_ID y STREAM_KEY_JWK configurados, genera un token firmado que caduca en 6 horas,
// así el vídeo solo se puede ver desde el área de alumnos (activa "Require signed URLs" en cada vídeo).

const enc = new TextEncoder();
const b64url = (bytes) => {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

let claveCache = null;
async function clave(env) {
  if (!claveCache) {
    const jwk = JSON.parse(atob(env.STREAM_KEY_JWK));
    claveCache = crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  }
  return claveCache;
}

async function tokenFirmado(env, uid) {
  const cabecera = b64url(enc.encode(JSON.stringify({ alg: "RS256", kid: env.STREAM_KEY_ID })));
  const datos = b64url(enc.encode(JSON.stringify({ sub: uid, kid: env.STREAM_KEY_ID, exp: Math.floor(Date.now() / 1000) + 6 * 3600 })));
  const firma = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", await clave(env), enc.encode(`${cabecera}.${datos}`)));
  return `${cabecera}.${datos}.${b64url(firma)}`;
}

export async function urlVideo(env, uid) {
  if (!uid || !env.STREAM_CUSTOMER_CODE) return null;
  const id = env.STREAM_KEY_ID && env.STREAM_KEY_JWK ? await tokenFirmado(env, uid) : uid;
  return `https://customer-${env.STREAM_CUSTOMER_CODE}.cloudflarestream.com/${id}/iframe?letterboxColor=transparent`;
}
