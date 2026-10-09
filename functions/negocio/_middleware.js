// Documentos internos y fuentes de los cursos: no se sirven en la web.
export const onRequest = () => new Response("No encontrado", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
