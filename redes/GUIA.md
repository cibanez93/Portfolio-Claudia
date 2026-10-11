# Guía visual de Instagram (@cibanez.dev)

Todas las imágenes que se publiquen tienen que verse como parte del mismo feed. Se hacen con la plantilla de esta carpeta, nunca desde cero.

## Cómo se hace un post

1. Copia `posts/google-maps-pamplona.html` a `posts/<nombre-del-post>.html` y cambia los textos.
2. Genera las imágenes: `node redes/generar.js redes/posts/<nombre-del-post>.html`
   (si `playwright` no se encuentra: `NODE_PATH=$(npm root -g) node …`).
3. Las imágenes salen en `redes/salida/<nombre-del-post>/01.png, 02.png…`, sin metadatos. Revísalas todas antes de entregarlas.

## Objetivo

Que quien entre en el perfil quiera escribir a Claudia. Cada post termina con una llamada a la acción por **WhatsApp (655 397 379)**, y el texto del post también.

## Lo que se repite (la marca)

- **Usuario:** `@cibanez.dev`, arriba a la izquierda en todas las imágenes.
- **Colores:** crema `#F7F2EB`, melocotón suave `#FAE9DC`, verde salvia `#DCE7D3`, marrón `#43352C` (texto y bloques), verde `#5E7D57` (etiquetas, botón de WhatsApp), melocotón `#F0D2B8` (subrayado, pegatinas). No se usan otros colores, fotos de banco ni degradados.
- **Tipografías (las de la web):** títulos en Bricolage Grotesque 800, etiquetas en Space Mono, texto en Figtree.
- **Detalles:** el subrayado melocotón en **una** palabra clave del título (`<mark>`), las estrellas ✦ (como en la bio) y la ilustración de Claudia (`img/chica-*.webp`). Nunca imágenes generadas con IA.

## Lo que cambia (para que el feed no sea siempre igual)

Cada post tiene que verse distinto del anterior. **La portada no puede repetir la composición ni el color de fondo de las dos últimas publicaciones** (ver `registro.md`). Dentro de un carrusel, se alternan composiciones y fondos.

Composiciones disponibles (ver ejemplos en `posts/`):

| Composición | Cómo es | Ejemplo |
|---|---|---|
| Ilustración lateral | Título a la izquierda, ilustración grande a la derecha cortada por el borde | `google-maps-pamplona.html` 01 |
| Centrada | Título centrado arriba, ilustración abajo en el centro sobre un círculo, pegatina girada | `precios-octubre.html` 01 |
| Cifra gigante | Un número enorme (precio, días, %) como protagonista | `precios-octubre.html` 02, 03 |
| Bloque partido | Mitad superior marrón con texto claro, mitad inferior crema | `precios-octubre.html` 04 |
| Conversación | Burbujas de chat que muestran cómo es hablar con Claudia | `precios-octubre.html` 05 |
| Tarjetas | Hasta 2 tarjetas blancas numeradas o una lista de 5 puntos | `google-maps-pamplona.html` 02–05 |
| Llamada a la acción | Pregunta grande, ilustración señalando el botón verde de WhatsApp | `precios-octubre.html` 06 |

Ideas que todavía no se han usado: antes y después de una web, captura de un proyecto en un móvil (`img/laksmir.webp`, `img/lk-pelo.webp`), mito/realidad, pregunta con encuesta para historias.

## Movimiento

- La portada y la última imagen de cada carrusel se sacan **también en vídeo** (`class="s anim"`, `data-dur="6"`): el título sube, el subrayado se dibuja, la ilustración entra y la pegatina o el botón aparecen. Se usan las clases `a-up`, `a-right`, `a-left`, `a-pop`, `a-grow`, `a-mark`, `a-float`, `a-twinkle` con el retraso en `--d`.
- En Instagram el vídeo se puede poner como primera diapositiva del carrusel o subir como Reel.
- Formatos: post y carrusel 1080×1350; historia y Reel 1080×1920 (`class="s story"`), con el texto importante fuera de los 250 px de arriba y de abajo.

## Antes de entregar

- Revisar todas las imágenes y algunos fotogramas de cada vídeo.
- Comprobar que ni las imágenes ni los vídeos llevan metadatos (el script los quita).
- Apuntar el post en `registro.md`.
- Texto del post: tono cercano (tuteando), sin enlaces («enlace en la bio»), terminar invitando a escribir por WhatsApp, 8–10 hashtags locales.
