# Guiones de vídeo · «Aparece en Google Maps en 7 días»

> Documento interno. 9 vídeos: bienvenida, 7 días y cierre. Cada uno mezcla **[CÁMARA]** (tú hablando, de pecho para arriba) y **[PANTALLA]** (grabación de pantalla con tu voz y, si quieres, tu cara en una esquina).
> No hace falta leerlo palabra por palabra: úsalo como guía y dilo con tus palabras. Suena más natural.

---

## Parte 1 · Cómo grabar (equipo, montaje y flujo de trabajo)

### Equipo mínimo (≈ 60–120 €)
| Qué | Recomendación | Por qué |
|---|---|---|
| **Micrófono** | Micrófono de solapa inalámbrico para el móvil, o un micro USB de escritorio | El audio importa más que la imagen. Udemy rechaza cursos con mal sonido. |
| **Cámara** | Tu móvil (cámara trasera) en un trípode con soporte para móvil | La cámara trasera tiene mucha más calidad que la frontal. |
| **Luz** | Una ventana delante de ti (de lado vale), o un aro o panel LED | Cara bien iluminada, sin contraluz. |
| **Pantalla** | OBS Studio (gratis), Loom, o la grabación de pantalla de tu sistema | Para las partes en las que enseñas cómo se hace. |
| **Edición** | CapCut (gratis), DaVinci Resolve (gratis) o Descript | Cortes, subtítulos automáticos y zooms. |

### Montaje
- Fondo ordenado y con algo de tu marca (una planta, tu portátil, tus colores). Separada medio metro de la pared.
- Cámara a la altura de los ojos, mirando a la lente (no a la pantalla).
- Ropa lisa, sin rayas finas. La misma ropa en todos los vídeos del curso.
- Teléfono en modo avión. Ventanas cerradas si hay ruido.

### Pantalla
- Resolución 1920×1080. Zoom del navegador al 125 % para que se lea en el móvil.
- Navegador limpio: sin marcadores personales ni pestañas abiertas.
- **Usa un perfil de prueba o tu propio Perfil de Empresa**, nunca el de un cliente, y tapa datos personales (correos, teléfonos de terceros, reseñas con nombres) al editar.

### Flujo de trabajo (graba todo el curso en 2 sesiones)
1. **Sesión 1 – Cámara (2 h):** graba seguidas todas las partes [CÁMARA] de los 9 vídeos. Si te equivocas, haz una pausa de 3 segundos y repite la frase: luego se corta fácil.
2. **Sesión 2 – Pantalla (2–3 h):** graba todas las partes [PANTALLA], una por vídeo.
3. **Edición:** une cámara + pantalla, quita silencios, añade subtítulos automáticos (revísalos), haz zoom en los botones que pulsas, y pon un rótulo con el título de la lección al principio.
4. **Exporta** en 1080p, MP4 (H.264). Nombre: `gm-00-bienvenida.mp4`, `gm-01-dia-1.mp4`…
5. **Sube** a Cloudflare Stream (con «Require Signed URLs») y pega cada ID en `functions/_lib/catalogo.js`.

### Duración objetivo
Bienvenida 2–3 min · Días 5–10 min · Cierre 2 min. **Total ≈ 60 min** (cumple el mínimo habitual de Udemy).

### Trucos para hablar a cámara
- Imagina que se lo explicas a una clienta concreta que conoces.
- Empieza cada vídeo con el resultado: «Al terminar este vídeo vas a tener…».
- Sonríe al principio y al final. La energía se nota.
- Frases cortas. Si una idea es larga, divídela.

---

## Parte 2 · Guiones

### Vídeo 0 · Bienvenida (2–3 min) · clave `bienvenida`

**[CÁMARA]**
> ¡Hola! Soy Claudia. Diseño webs para negocios de Pamplona y de toda Navarra, y hay una pregunta que me hacen casi todos mis clientes: «¿Cómo hago para que me encuentren en Google Maps?».
>
> Piensa en la última vez que buscaste «peluquería cerca de mí» o «fontanero en tu ciudad». Lo primero que ves no son webs: es un mapa con tres negocios. Y la mayoría de la gente elige entre esos tres.
>
> En este curso vamos a hacer que tu negocio esté preparado para estar ahí. Son 7 días. Cada día, un vídeo corto como este, la lección por escrito y una tarea de 20 a 45 minutos. Sin tecnicismos.
>
> Te voy a ser sincera: nadie te puede garantizar salir el primero. Pero si haces las 7 tareas, tu ficha va a estar mejor que la de la mayoría de tus competidores, y eso se nota en llamadas, visitas y reservas.

**[PANTALLA]** Recorrido rápido por el área de alumnos: índice, una lección, el vídeo, la lista de tareas para marcar, el botón «Marcar como completada» y los Recursos.
> Aquí tienes el índice. En cada lección, el vídeo arriba y debajo todo por escrito. Al final, una lista para marcar. Y aquí abajo, en Recursos, las plantillas que vamos a usar: la descripción, los mensajes para pedir reseñas, las respuestas…

**[CÁMARA]**
> Para empezar solo necesitas una cuenta de Google, tu móvil y los datos de tu negocio a mano. ¿Lista? Nos vemos en el día 1.

---

### Vídeo 1 · Día 1: crea o reclama tu perfil (6–8 min) · clave `dia-1`

**[CÁMARA]**
> Hoy vamos a hacer lo más importante de todo: que tu negocio exista en Google Maps y que sea tuyo. Al terminar este vídeo vas a tener tu perfil creado o recuperado y la verificación en marcha.

**[PANTALLA]**
1. Buscar el negocio en Google Maps. Enseñar el caso «ya existe» → botón para reclamarlo.
2. Si no existe: business.google.com → crear perfil.
3. **Nombre:** escribir el nombre real. Enseñar en pantalla un ejemplo de lo que NO hay que hacer («Peluquería Ana – Mechas Balayage Pamplona Barata») y explicar que puede suspender el perfil.
4. **Local o zona de servicio:** enseñar las dos opciones y cuándo usar cada una.
5. **Verificación:** las opciones que puede pedir Google. Si es por vídeo, explicar qué debe salir (exterior, rótulo, interior, algo que demuestre que es tuyo) y que se graba sin cortes.
6. Configuración → personas y acceso: añadir a alguien como administrador sin compartir la contraseña.

**[CÁMARA]**
> Un consejo de alguien que lo ha visto muchas veces: el vídeo de verificación con prisas es el motivo número uno de rechazo. Hazlo con calma y con buena luz.
>
> Tu tarea de hoy: busca tu negocio, créalo o reclámalo, y empieza la verificación. Marca la lista de abajo y nos vemos mañana.

---

### Vídeo 2 · Día 2: categorías y servicios (8–10 min) · clave `dia-2`

**[CÁMARA]**
> Hoy le vamos a explicar a Google, sin dejar lugar a dudas, a qué te dedicas. Y empezamos por lo que más pesa de toda la ficha: la categoría principal.

**[PANTALLA]**
1. Truco: buscar a 3 competidores bien posicionados y mirar su categoría bajo el nombre.
2. Cambiar la categoría principal; enseñar cómo se escribe una palabra y aparecen opciones.
3. Categorías secundarias: solo las que haces de verdad.
4. Datos básicos: enseñar en pantalla la ficha, la web e Instagram, y señalar que el nombre, la dirección y el teléfono deben estar escritos igual en todos.
5. Horario + horarios especiales (añadir uno de ejemplo para un festivo).
6. Enlace de reservas y WhatsApp.
7. Servicios: añadir 3 servicios en directo con nombre concreto, precio y descripción. Ejemplo ❌ «Tratamientos» → ✅ «Limpieza facial profunda».
8. Atributos.

**[CÁMARA]**
> Si solo te quedas con una cosa de hoy: nombres concretos en los servicios. Así apareces cuando alguien busca exactamente eso. Tu tarea: completa todo y añade al menos 10 servicios.

---

### Vídeo 3 · Día 3: descripción y web (6–8 min) · clave `dia-3`

**[CÁMARA]**
> Hoy toca convencer. Cuando alguien abre tu ficha, lee la descripción y casi siempre pulsa en «Sitio web». Vamos a cuidar las dos cosas.

**[PANTALLA]**
1. Abrir el Anexo A. Rellenar la plantilla en directo con un negocio de ejemplo, frase a frase.
2. Pegarla en el perfil. Recordar: sin enlaces, sin ofertas con precio, sin mayúsculas.
3. Abrir una web en el móvil (vista móvil del navegador) y recorrer la lista: velocidad, nombre-dirección-teléfono iguales, una sección por servicio, mapa, botón de reservar.

**[CÁMARA]**
> ¿No tienes web? Puedes empezar con un perfil muy completo y tu enlace de reservas. Pero una web propia te ayuda a que Google confíe en ti y a convertir visitas en clientes. Tu tarea: publica tu descripción y apunta lo que tienes que mejorar de tu web.

---

### Vídeo 4 · Día 4: fotos (6–8 min) · clave `dia-4`

**[CÁMARA]**
> Las fotos venden. Una ficha con fotos reales y cuidadas genera mucha más confianza que una con tres fotos oscuras o de banco de imágenes. Hoy vas a subir al menos 15.

**[PANTALLA]**
1. Enseñar la tabla de fotos de la lección (logo, portada, exterior, interior, equipo, trabajos).
2. Ejemplos buenos y malos (fotos tuyas o de tu propio espacio): luz natural vs. flash, ordenado vs. desordenado.
3. Subir fotos desde el perfil y desde el móvil.
4. Dónde ver las fotos que han subido otras personas y cómo pedir que se revise una.

**[CÁMARA]** *(opcional: grábalo con el móvil en un local real)*
> Tres trucos rápidos: luz de ventana, lente limpia y nada de filtros. Y si sale un cliente, pídele permiso por escrito. Tu tarea: 15 fotos subidas hoy.

---

### Vídeo 5 · Día 5: el sistema de reseñas (8–10 min) · clave `dia-5`

**[CÁMARA]**
> Este es el día más importante del curso. Las reseñas influyen en el orden en el que apareces y, sobre todo, en si te eligen a ti o al de al lado. Hoy no vamos a pedir reseñas una vez: vamos a montar un sistema para conseguirlas cada semana.
>
> Antes, las normas, porque saltárselas sale caro: nunca compres reseñas ni las escribas tú, no regales nada a cambio de una reseña y pide a todos tus clientes, no solo a los que sabes que te van a poner 5 estrellas.

**[PANTALLA]**
1. En el perfil: opción para pedir reseñas → copiar el enlace corto. Guardarlo en las notas del móvil.
2. Abrir el Anexo B y adaptar el mensaje de WhatsApp en directo.
3. Crear un código QR con el enlace (un generador de QR gratuito) e imprimirlo en una tarjeta.
4. Enseñar en el móvil cómo lo ve el cliente al pulsar el enlace.

**[CÁMARA]**
> El mejor momento para pedirla es justo al terminar, cuando el cliente está contento. Y la mejor manera es decirlo en persona y mandarle el enlace por WhatsApp en ese momento.
>
> Tu tarea de hoy: pide reseña a 5 clientes recientes. Y cuéntaselo a tu equipo para que lo hagan también.

---

### Vídeo 6 · Día 6: responder y publicar (7–9 min) · clave `dia-6`

**[CÁMARA]**
> Quien lee tus reseñas no solo mira la nota: mira cómo respondes. Sobre todo a las malas. Hoy vamos a responder a todas y a publicar tu primera novedad.

**[PANTALLA]**
1. Responder a una reseña positiva (personal, mencionando el servicio).
2. Responder a una negativa con la regla de las 4 R, usando el Anexo C. Escribirla en directo.
3. Cómo denunciar una reseña que incumple las normas.
4. Crear una publicación de novedad con foto y otra de oferta. Abrir el Anexo D (calendario de 12 semanas).

**[CÁMARA]**
> Nunca respondas en caliente: espera unas horas y léela otra vez antes de publicarla. Tu tarea: responde a todas tus reseñas, haz tu primera publicación y pon un recordatorio semanal en el móvil.

---

### Vídeo 7 · Día 7: medir y mantener (6–8 min) · clave `dia-7`

**[CÁMARA]**
> Ya lo tienes todo montado. Hoy vamos a ver tus números de partida y a dejar una rutina de 10 minutos a la semana para que esto siga funcionando solo.

**[PANTALLA]**
1. Abrir «Rendimiento»: visualizaciones, búsquedas, llamadas, indicaciones, clics en la web.
2. Mirar las búsquedas con las que te encuentran y añadir un servicio que falte.
3. Apuntar los números en la hoja del Anexo E.
4. Dónde se ven los cambios sugeridos por otras personas.
5. Crear en el calendario del móvil la rutina semanal y la revisión de 30 días.

**[CÁMARA]**
> Y un aviso importante: Google no te va a llamar para ofrecerte salir el primero ni para que tu perfil no se borre. Si alguien te llama con eso, es una estafa. El perfil es gratis.
>
> Tu tarea: apunta tus números de hoy y programa tu rutina.

---

### Vídeo 8 · ¡Terminado! (2 min) · clave `terminado`

**[CÁMARA]**
> ¡Lo has conseguido! Si has marcado todas las listas, tu ficha está completa, verificada, con buenas fotos, con un sistema de reseñas y con una rutina para mantenerla. Mejor que la de la mayoría de negocios.
>
> Ahora toca constancia: los resultados se notan en semanas y crecen mes a mes con cada reseña.
>
> Me ayudaría muchísimo que me contaras cómo te ha ido: respóndeme al correo del curso. Y si quieres seguir, en mi web tienes más cursos cortos para sacarle partido a la IA y a las herramientas digitales en tu negocio. ¡Gracias por confiar en mí!

---

## Parte 3 · Vídeo de presentación para la página de venta y Udemy (60–90 s)

**[CÁMARA]**
> ¿Buscas tu servicio en Google Maps y salen otros negocios antes que el tuyo? Soy Claudia, diseño webs para negocios locales, y en este curso te enseño, en 7 días y con tareas de 20 a 45 minutos, a dejar tu ficha de Google completa, con buenas fotos y con un sistema para conseguir reseñas reales cada semana.
>
> Sin tecnicismos y sin trucos raros que te pueden costar la ficha: lo mismo que hago con mis clientes.

**[PANTALLA]** 10–15 s de imágenes rápidas: una ficha completa, el enlace de reseñas, una respuesta a una reseña, el panel de rendimiento.

**[CÁMARA]**
> Son 19 euros, tienes 14 días de garantía y lo puedes empezar hoy mismo. Te espero dentro.
