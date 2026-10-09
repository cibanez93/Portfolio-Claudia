// Genera el área de alumnos a partir de contenido-cursos/<id>.md
//
//   npm run build:cursos
//
// Formato del Markdown:
//   # Título del curso          → título
//   texto antes del primer ##   → presentación del curso
//   ## Lección                  → una página por cada "##" (Bienvenida, Día 1 · ..., Módulo 2 · ...)
//   # Anexos                    → las "##" que vienen después se agrupan como "Recursos" (sin vídeo)
//   - [ ] tarea                 → casilla que el alumno puede marcar (se guarda en su navegador)

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const fuente = join(raiz, "contenido-cursos");
const destino = join(raiz, "alumnos");

marked.use({ gfm: true });

const quitarAcentos = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
function slugLeccion(titulo) {
  const t = quitarAcentos(titulo).toLowerCase();
  const num = t.match(/^(dia|leccion|modulo|anexo)\s+([a-z0-9]+)/);
  if (num) return `${num[1]}-${num[2]}`;
  return t.split("·")[0].replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const textoPlano = (md) => md.replace(/[*_`#>]/g, "").trim();

function casillas(html, clave) {
  let i = 0;
  return html.replace(/<input (?:checked="" )?disabled="" type="checkbox"> ?/g, () => {
    const id = `${clave}:${i++}`;
    return `<input type="checkbox" data-check="${id}" aria-label="Marcar"> `;
  });
}

function pagina({ titulo, curso, cuerpo, raizCurso }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>${esc(titulo)} · ${esc(curso)}</title>
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="stylesheet" href="/fonts/fonts.css">
<link rel="stylesheet" href="/css/alumnos.css">
</head>
<body>
<div class="wrap">
<header class="top">
  <a class="logo" href="/alumnos/">Mis cursos <span>/ Claudia Ibáñez</span></a>
  <a class="salir" href="/api/salir">Salir</a>
</header>
<nav class="crumbs" aria-label="Migas de pan"><a href="/alumnos/">Mis cursos</a> › <a href="${raizCurso}">${esc(curso)}</a></nav>
${cuerpo}
</div>
<script src="/js/alumnos.js" defer></script>
</body>
</html>
`;
}

function construir(archivo) {
  const id = archivo.replace(/\.md$/, "");
  const md = readFileSync(join(fuente, archivo), "utf8");
  const lineas = md.split("\n");

  let titulo = id;
  const intro = [];
  const lecciones = [];
  let actual = null;
  let enRecursos = false;
  for (const l of lineas) {
    if (/^# /.test(l)) {
      if (!lecciones.length && !actual) titulo = l.slice(2).trim();
      else if (/^# Anexos/i.test(l)) { if (actual) lecciones.push(actual); actual = null; enRecursos = true; }
      continue;
    }
    if (/^## /.test(l)) {
      if (actual) lecciones.push(actual);
      const t = l.slice(3).trim();
      actual = { titulo: t, slug: slugLeccion(t), recurso: enRecursos, md: [] };
      continue;
    }
    if (/^---\s*$/.test(l)) continue;
    (actual ? actual.md : intro).push(l);
  }
  if (actual) lecciones.push(actual);

  const raizCurso = `/alumnos/${id}/`;
  const dirCurso = join(destino, id);
  if (existsSync(dirCurso)) rmSync(dirCurso, { recursive: true });
  mkdirSync(dirCurso, { recursive: true });

  const clases = lecciones.filter((l) => !l.recurso);
  const recursos = lecciones.filter((l) => l.recurso);

  lecciones.forEach((lec, i) => {
    const ant = lecciones[i - 1];
    const sig = lecciones[i + 1];
    const clave = `${id}/${lec.slug}`;
    // "**Anexo B**" → enlace a la página de ese anexo
    const contenido = casillas(marked.parse(lec.md.join("\n")), clave)
      .replace(/<strong>Anexo ([A-Z])<\/strong>/g, (_, l) => `<a href="${raizCurso}anexo-${l.toLowerCase()}"><strong>Anexo ${l}</strong></a>`);
    const video = lec.recurso ? "" : `<div class="video" data-video="${clave}"><p>El vídeo de esta lección estará disponible muy pronto.</p></div>`;
    const cuerpo = `<main class="leccion" data-leccion="${clave}">
  <p class="kicker">${lec.recurso ? "Recursos" : `Lección ${clases.indexOf(lec) + 1} de ${clases.length}`}</p>
  <h1>${esc(lec.titulo)}</h1>
  ${video}
  <article class="contenido">${contenido}</article>
  <div class="hecho"><button type="button" class="btn dark" data-completar="${clave}">Marcar como completada</button></div>
  <nav class="paginacion">
    ${ant ? `<a href="${raizCurso}${ant.slug}">← ${esc(ant.titulo)}</a>` : `<span></span>`}
    ${sig ? `<a href="${raizCurso}${sig.slug}">${esc(sig.titulo)} →</a>` : `<a href="${raizCurso}">Volver al índice →</a>`}
  </nav>
</main>`;
    writeFileSync(join(dirCurso, `${lec.slug}.html`), pagina({ titulo: lec.titulo, curso: titulo, cuerpo, raizCurso }));
  });

  const item = (l) => `<li><a href="${raizCurso}${l.slug}" data-estado="${id}/${l.slug}">${esc(l.titulo)}</a></li>`;
  const indice = `<main class="indice" data-curso="${id}" data-total="${clases.length}">
  <p class="kicker">Curso</p>
  <h1>${esc(titulo)}</h1>
  <div class="intro">${marked.parse(intro.join("\n"))}</div>
  <div class="progreso" aria-live="polite"><div class="barra"><span></span></div><p></p></div>
  <p><a class="btn dark" href="${raizCurso}${clases[0]?.slug || ""}" data-continuar>Empezar</a></p>
  <h2>Lecciones</h2>
  <ol class="lista">${clases.map(item).join("")}</ol>
  ${recursos.length ? `<h2>Recursos</h2><ul class="lista recursos">${recursos.map(item).join("")}</ul>` : ""}
</main>`;
  writeFileSync(join(dirCurso, "index.html"), pagina({ titulo: "Índice", curso: titulo, cuerpo: indice, raizCurso }));

  console.log(`✓ ${id}: ${clases.length} lecciones, ${recursos.length} recursos → alumnos/${id}/`);
  return { id, titulo, lecciones: lecciones.map((l) => ({ slug: l.slug, titulo: textoPlano(l.titulo), recurso: l.recurso })) };
}

const cursos = readdirSync(fuente).filter((f) => f.endsWith(".md")).map(construir);
writeFileSync(join(destino, "cursos.json"), JSON.stringify(cursos, null, 1));
