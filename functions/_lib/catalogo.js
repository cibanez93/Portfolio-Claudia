// Catálogo de cursos que se venden en la web.
//
// Para añadir un curso:
//   1. Crea su producto y su precio en Stripe y copia el ID del precio (price_...) en `precio`.
//   2. Escribe su contenido en cursos/<id>/curso.md y ejecuta `npm run build:cursos`.
//   3. Sube cada vídeo a Cloudflare Stream y pega su ID en `videos` (clave = página de la lección).
//
// `precio` vacío = el curso no se puede comprar todavía (la API devuelve un error amable).

export const CURSOS = {
  "google-maps": {
    titulo: "Aparece en Google Maps en 7 días",
    pagina: "/curso-google-maps",
    precio: "", // price_... de Stripe
    videos: {
      // "bienvenida": "ID de Cloudflare Stream",
      // "dia-1": "",
    },
  },
};

// Pack con acceso a todos los cursos, presentes y futuros.
export const PACK = {
  id: "*",
  titulo: "Todos los cursos",
  pagina: "/cursos",
  precio: "", // price_... de Stripe
};

export function productoPorId(id) {
  if (id === PACK.id || id === "todos") return PACK;
  return CURSOS[id] ? { id, ...CURSOS[id] } : null;
}
