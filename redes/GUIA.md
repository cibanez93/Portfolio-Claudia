# Guía visual de Instagram (@cibanez.dev)

Todas las imágenes que se publiquen tienen que verse como parte del mismo feed. Se hacen con la plantilla de esta carpeta, nunca desde cero.

## Cómo se hace un post

1. Copia `posts/google-maps-pamplona.html` a `posts/<nombre-del-post>.html` y cambia los textos.
2. Genera las imágenes: `node redes/generar.js redes/posts/<nombre-del-post>.html`
   (si `playwright` no se encuentra: `NODE_PATH=$(npm root -g) node …`).
3. Las imágenes salen en `redes/salida/<nombre-del-post>/01.png, 02.png…`, sin metadatos. Revísalas todas antes de entregarlas.

## Reglas

- **Usuario:** `@cibanez.dev`, arriba a la izquierda en todas las imágenes.
- **Formatos:** post y carrusel 1080×1350 (`<section class="s">`); historia 1080×1920 (`<section class="s story">`), con el texto importante fuera de los 250 px de arriba y de abajo.
- **Fondo:** crema `#F7F2EB`. Para variar una diapositiva dentro de un carrusel, melocotón suave (`class="s alt"`). Nada de fondos oscuros, fotos de banco ni degradados.
- **Colores:** texto marrón `#43352C`, texto secundario `#7A6455`, verde `#5E7D57` para la etiqueta de arriba y los números, melocotón `#F0D2B8` solo para subrayar, verde salvia `#DCE7D3` para el círculo detrás de la ilustración.
- **Tipografías (las de la web):** títulos en Bricolage Grotesque 700, etiquetas y subtítulos en Space Mono, texto en Figtree.
- **Título:** corto, con **una sola** palabra o expresión clave subrayada en melocotón (`<mark>`).
- **Ilustración:** la portada y la última diapositiva llevan a Claudia (`img/chica-pensando.webp`, `chica-portatil.webp`, `chica-senalando.webp`) abajo a la derecha, cortada por el borde y con el círculo verde detrás. Las diapositivas de contenido van sin ilustración.
- **Portada:** etiqueta, título con pregunta o promesa, subtítulo de una línea y botón oscuro «Desliza →».
- **Contenido:** máximo 2 tarjetas blancas con número, o una lista de 5 puntos como mucho.
- **Cierre:** llamada a la acción y el botón con `claudiaibanez.com/blog` (o lo que toque).
- **Sin metadatos:** el script quita todos los metadatos del PNG. No se generan imágenes con IA: la ilustración es siempre la de la web.
- **Texto del post:** en el tono de la web (cercano, tuteando), sin enlaces (poner «enlace en la bio»), con 8–10 hashtags locales (#Pamplona #Navarra…).
