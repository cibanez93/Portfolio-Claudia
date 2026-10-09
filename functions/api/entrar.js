// GET /api/entrar?token=...  (enlace del correo) → abre la sesión.
import { verificar, getAlumno, cookieSesion, redirigir } from "../_lib/curso.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const datos = await verificar(env, url.searchParams.get("token"), "enlace");
  if (!datos || !(await getAlumno(env, datos.email))) return redirigir(`${url.origin}/acceso?caducado=1`);
  return redirigir(`${url.origin}/alumnos/`, { "Set-Cookie": await cookieSesion(env, datos.email) });
}
