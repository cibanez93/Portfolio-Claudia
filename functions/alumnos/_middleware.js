// Protege /alumnos/*: hace falta sesión y, dentro de /alumnos/<curso>/, tener ese curso.
// También inserta los vídeos (firmados) en los huecos <div data-video="curso/leccion">.
import { alumnoDeLaPeticion, tieneCurso } from "../_lib/curso.js";
import { CURSOS } from "../_lib/catalogo.js";
import { urlVideo } from "../_lib/video.js";

const PRIVADO = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  const alumno = await alumnoDeLaPeticion(env, request);
  if (!alumno) {
    return Response.redirect(`${url.origin}/acceso?next=${encodeURIComponent(url.pathname)}`, 302);
  }

  const curso = url.pathname.split("/")[2] || "";
  if (curso && !curso.includes(".")) {
    if (!CURSOS[curso]) return new Response("No encontrado", { status: 404, headers: PRIVADO });
    if (!tieneCurso(alumno, curso)) return Response.redirect(`${url.origin}${CURSOS[curso].pagina}?sin-acceso=1#comprar`, 302);
  }

  const res = await next();
  const cabeceras = new Headers(res.headers);
  for (const [k, v] of Object.entries(PRIVADO)) cabeceras.set(k, v);
  const respuesta = new Response(res.body, { status: res.status, statusText: res.statusText, headers: cabeceras });
  if (!(res.headers.get("Content-Type") || "").includes("text/html")) return respuesta;

  return new HTMLRewriter()
    .on("[data-video]", {
      async element(el) {
        const [c, leccion] = (el.getAttribute("data-video") || "").split("/");
        const src = await urlVideo(env, CURSOS[c]?.videos?.[leccion]);
        if (src) {
          el.setInnerContent(
            `<iframe src="${src}" title="Vídeo de la lección" loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`,
            { html: true },
          );
          el.setAttribute("class", "video listo");
        }
      },
    })
    .transform(respuesta);
}
