// GET /api/yo → datos del alumno con sesión (para el panel). 401 si no hay sesión.
import { alumnoDeLaPeticion, tieneCurso } from "../_lib/curso.js";
import { CURSOS } from "../_lib/catalogo.js";

export async function onRequestGet({ request, env }) {
  const alumno = await alumnoDeLaPeticion(env, request);
  if (!alumno) return Response.json({ error: "sin sesión" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const cursos = Object.entries(CURSOS).map(([id, c]) => ({ id, titulo: c.titulo, pagina: c.pagina, acceso: tieneCurso(alumno, id) }));
  return Response.json({ email: alumno.email, nombre: alumno.nombre || "", cursos }, { headers: { "Cache-Control": "no-store" } });
}
