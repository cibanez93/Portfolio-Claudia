// POST /api/login  (campo "email") → envía un enlace de acceso si es alumno.
// La respuesta es la misma exista o no, para no revelar quién ha comprado.
import { getAlumno, enlaceAcceso, enviarCorreo, plantillaCorreo, normalizar, redirigir } from "../_lib/curso.js";

export async function onRequestPost({ request, env }) {
  const origin = new URL(request.url).origin;
  const email = normalizar((await request.formData()).get("email"));
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // Límite sencillo: un enlace por correo cada 2 minutos.
    const limite = `limite:${email}`;
    if (!(await env.ALUMNOS.get(limite)) && (await getAlumno(env, email))) {
      await env.ALUMNOS.put(limite, "1", { expirationTtl: 120 });
      const url = await enlaceAcceso(env, origin, email);
      await enviarCorreo(env, email, "Tu enlace para entrar a tus cursos", plantillaCorreo(
        "Entra a tus cursos",
        ["Pulsa el botón para entrar. El enlace caduca en 30 minutos.", "Si no lo has pedido tú, ignora este correo."],
        { url, texto: "Entrar" },
      ));
    }
  }
  return redirigir(`${origin}/acceso?enviado=1`);
}
