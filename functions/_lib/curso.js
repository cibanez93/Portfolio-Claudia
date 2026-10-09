// Utilidades compartidas de la plataforma de cursos: tokens firmados, sesión, alumnos, Stripe y correo.
// Variables de entorno: ver negocio/curso-google-maps/PLATAFORMA.md

const enc = new TextEncoder();

export const COOKIE = "alumno";
const SESION_DIAS = 180;
const ENLACE_MINUTOS = 30;

// ---------- base64url y HMAC ----------
function b64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlToBytes(str) {
  const s = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}
function igualSeguro(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

// Token = payload.firma, con propósito ("sesion" o "enlace") y caducidad.
export async function firmar(env, datos, minutos) {
  const payload = b64url(enc.encode(JSON.stringify({ ...datos, exp: Date.now() + minutos * 60_000 })));
  return `${payload}.${b64url(await hmac(env.SESSION_SECRET, payload))}`;
}
export async function verificar(env, token, uso) {
  if (!token || !env.SESSION_SECRET) return null;
  const [payload, firma] = token.split(".");
  if (!payload || !firma) return null;
  if (!igualSeguro(firma, b64url(await hmac(env.SESSION_SECRET, payload)))) return null;
  try {
    const datos = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload)));
    if (datos.uso !== uso || !datos.email || Date.now() > datos.exp) return null;
    return datos;
  } catch {
    return null;
  }
}

// ---------- alumnos (KV) ----------
export const normalizar = (email) => String(email || "").trim().toLowerCase();

export async function getAlumno(env, email) {
  const v = await env.ALUMNOS.get(`alumno:${normalizar(email)}`);
  return v ? JSON.parse(v) : null;
}
// Da acceso a un curso (o a todos con "*"). Es idempotente.
export async function darAcceso(env, email, curso, extra = {}) {
  const e = normalizar(email);
  const previo = (await getAlumno(env, e)) || { email: e, alta: new Date().toISOString(), cursos: [] };
  const cursos = new Set(previo.cursos || []);
  if (curso) cursos.add(curso);
  const alumno = { ...previo, ...extra, email: e, cursos: [...cursos] };
  await env.ALUMNOS.put(`alumno:${e}`, JSON.stringify(alumno));
  return alumno;
}
export const tieneCurso = (alumno, curso) => !!alumno && ((alumno.cursos || []).includes("*") || (alumno.cursos || []).includes(curso));

// Quita un curso; si no le queda ninguno, borra al alumno.
export async function quitarCurso(env, email, curso) {
  const alumno = await getAlumno(env, email);
  if (!alumno) return;
  alumno.cursos = (alumno.cursos || []).filter((c) => c !== curso);
  if (alumno.cursos.length) await env.ALUMNOS.put(`alumno:${alumno.email}`, JSON.stringify(alumno));
  else await quitarAcceso(env, email);
}
export async function quitarAcceso(env, email) {
  await env.ALUMNOS.delete(`alumno:${normalizar(email)}`);
}

// ---------- sesión ----------
export async function cookieSesion(env, email) {
  const token = await firmar(env, { uso: "sesion", email: normalizar(email) }, SESION_DIAS * 24 * 60);
  return `${COOKIE}=${token}; Path=/; Max-Age=${SESION_DIAS * 86400}; HttpOnly; Secure; SameSite=Lax`;
}
export const cookieBorrar = `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

export function leerCookie(request, nombre) {
  const c = request.headers.get("Cookie") || "";
  for (const parte of c.split(/;\s*/)) {
    const i = parte.indexOf("=");
    if (i > 0 && parte.slice(0, i) === nombre) return parte.slice(i + 1);
  }
  return null;
}

export async function alumnoDeLaPeticion(env, request) {
  const sesion = await verificar(env, leerCookie(request, COOKIE), "sesion");
  if (!sesion) return null;
  return getAlumno(env, sesion.email);
}

export async function enlaceAcceso(env, origin, email) {
  const token = await firmar(env, { uso: "enlace", email: normalizar(email) }, ENLACE_MINUTOS);
  return `${origin}/api/entrar?token=${encodeURIComponent(token)}`;
}

// ---------- Stripe ----------
export async function stripe(env, metodo, ruta, campos) {
  const res = await fetch(`https://api.stripe.com/v1/${ruta}`, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: campos ? new URLSearchParams(campos) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe ${res.status}: ${json?.error?.message || "error"}`);
  return json;
}

// Comprueba la cabecera Stripe-Signature (t=...,v1=...) con tolerancia de 5 minutos.
export async function verificarFirmaStripe(env, cuerpo, cabecera) {
  if (!cabecera || !env.STRIPE_WEBHOOK_SECRET) return false;
  const partes = Object.fromEntries(cabecera.split(",").map((p) => p.split("=")).filter((p) => p.length === 2 && p[0] !== "v1"));
  const firmas = cabecera.split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  const t = Number(partes.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const esperada = [...(await hmac(env.STRIPE_WEBHOOK_SECRET, `${t}.${cuerpo}`))].map((b) => b.toString(16).padStart(2, "0")).join("");
  return firmas.some((f) => igualSeguro(f, esperada));
}

// ---------- correo (Resend) ----------
export async function enviarCorreo(env, para, asunto, html) {
  if (!env.RESEND_API_KEY) {
    console.log(`[correo sin enviar: falta RESEND_API_KEY] ${para} · ${asunto}`);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM || "Claudia Ibáñez <curso@claudiaibanez.com>",
      reply_to: env.MAIL_REPLY_TO || "cibanez.dev@outlook.com",
      to: [para],
      subject: asunto,
      html,
    }),
  });
  if (!res.ok) console.log(`Resend ${res.status}: ${await res.text()}`);
  return res.ok;
}

export function plantillaCorreo(titulo, parrafos, boton) {
  const p = parrafos.map((t) => `<p style="margin:0 0 14px;line-height:1.6">${t}</p>`).join("");
  const b = boton
    ? `<p style="margin:22px 0"><a href="${boton.url}" style="background:#5E7D57;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block">${boton.texto}</a></p>`
    : "";
  return `<!doctype html><html lang="es"><body style="margin:0;background:#F7F2EB;padding:24px;font-family:Helvetica,Arial,sans-serif;color:#43352C">
<div style="max-width:520px;margin:auto;background:#FFFDFA;border:1px solid #E8DDD0;border-radius:16px;padding:28px">
<h1 style="font-size:22px;margin:0 0 16px">${titulo}</h1>${p}${b}
<p style="margin:22px 0 0;font-size:13px;color:#7A6455">Claudia Ibáñez · claudiaibanez.com<br>Si tienes cualquier duda, responde a este correo.</p>
</div></body></html>`;
}

export const redirigir = (url, cabeceras = {}) => new Response(null, { status: 303, headers: { Location: url, ...cabeceras } });
