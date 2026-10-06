# Estrategia de activos digitales con ingresos recurrentes

**Para:** Claudia Ibáñez · frontend developer y diseñadora web
**Versión:** 1.0 · octubre 2026
**Complementa a:** `sistema-ingresos-pasivos.md` (diagnóstico, finanzas y rutinas). Este documento baja al detalle de **qué productos digitales crear y cómo operarlos**.

> Documento interno de trabajo. No forma parte de la web pública.

---

## 0. Resumen en una página

**Idea central:** no crear nueve productos sueltos, sino **un ecosistema** en el que cada activo lleva al siguiente. Todos salen del mismo conocimiento (webs, Google Maps, reservas, tarjetas regalo para negocios de cita previa) y del mismo código y diseño que ya tienes.

**Dos públicos, por orden de prioridad:**
1. **Dueños de negocios locales de cita previa** (peluquerías, estética, barberías, fisios, uñas). Público principal: compran soluciones, no tecnología.
2. **Freelances y pequeñas agencias web** de habla hispana. Público secundario: compran tiempo ahorrado (plantillas, componentes, licencias).

**Catálogo priorizado:**

| Prioridad | Activo | Público | Precio | Tipo de ingreso | Inicio |
|---|---|---|---|---|---|
| 1 | **Plantillas web** (Next.js/Astro) | Freelances + negocios | 59–149 € | Puntual + actualizaciones | Mes 1 |
| 2 | **Pack de prompts** para negocios de cita previa | Negocios | 19–29 € | Puntual | Mes 2 |
| 3 | **Imprimibles y plantillas Canva** para salones | Negocios | 9–39 € | Puntual (volumen) | Mes 2 |
| 4 | **eBook / guía** "Aparece en Google Maps" | Negocios | 19–29 € | Puntual + captación | Mes 3 |
| 5 | **Software (micro-SaaS)** tarjetas regalo, bonos y reseñas | Negocios | 19–79 €/mes | **Recurrente** | Mes 3–6 |
| 6 | **Membresía** "Negocio visible" | Negocios | 15–25 €/mes | **Recurrente** | Mes 6 |
| 7 | **Curso en línea** | Negocios (A) y freelances (B) | 97–297 € | Puntual / cohortes | Mes 8–10 |
| 8 | **Recursos de stock** (ilustraciones, mockups) | Freelances, diseñadores | 15–49 € | Puntual (cola larga) | Mes 4, en ratos libres |
| 9 | **Licenciamiento** (marca blanca, licencias de agencia) | Agencias | 300–3.000 € + cuota | **Recurrente** / alto valor | Mes 9–12 |

**Objetivo a 12 meses** (escenario base, sin IVA): **2.000–2.800 €/mes** entre todos los activos, de los cuales **≥ 50 % recurrente** (SaaS, membresía, licencias, actualizaciones de pago).

---

## 1. La arquitectura del ecosistema

### 1.1 Escalera de valor

Cada peldaño tiene un trabajo: atraer, convertir o retener. Un cliente sube peldaños con el tiempo, y el valor que deja crece.

```
                                                      ┌──────────────────────────┐
                                               ┌──────┤ 6. LICENCIAS / MARCA     │ 300–3.000 € + cuota
                                       ┌───────┤      │    BLANCA (agencias)     │
                               ┌───────┤       │      └──────────────────────────┘
                               │       │ 5. SOFTWARE (SaaS) 19–79 €/mes          ← RECURRENTE
                       ┌───────┤ 4. MEMBRESÍA 15–25 €/mes                        ← RECURRENTE
               ┌───────┤ 3. CURSO 97–297 €
       ┌───────┤ 2. PRODUCTOS DE ENTRADA 9–149 € (plantillas, eBook, prompts, imprimibles, stock)
       │ 1. GRATIS: blog SEO, lista de verificación, mini-plantillas, Instagram
       └────────────────────────────────────────────────────────────────────────
```

### 1.2 Cómo se alimentan unos a otros

| Activo | Lleva a… | Cómo |
|---|---|---|
| Blog y contenido gratuito | Lista de correo | Imán: lista de verificación de Google Maps, mini-pack de prompts |
| Lista de correo | Productos de entrada | Secuencia de bienvenida de 5 correos con oferta |
| Plantillas web | SaaS | Integración del widget de tarjetas regalo/reseñas incluida |
| Imprimibles | SaaS | Plantillas de tarjeta regalo que "funcionan mejor online" → enlace al SaaS |
| eBook + prompts | Membresía | "Cada mes, las tareas de visibilidad hechas" |
| Membresía | SaaS + curso | Descuento para miembros; el curso entra en la membresía anual |
| SaaS | Licencias | Agencias que lo quieren con su marca |

### 1.3 Regla de capacidad

Con 8–10 h/semana para activos (ver el sistema general): **un activo en construcción a la vez**, el resto en mantenimiento. La sección 12 da el calendario y la sección 13 el presupuesto de horas de mantenimiento.

---

## 2. Infraestructura común (se monta una vez)

| Pieza | Recomendación | Por qué |
|---|---|---|
| **Tienda y cobro** | Plataforma *merchant of record* (Lemon Squeezy, Paddle, Gumroad o similar) para productos digitales; Stripe Billing para el SaaS | El MoR gestiona el IVA de toda la UE (OSS) y el resto del mundo; tú facturas solo a la plataforma. |
| **Escaparate** | Sección `/recursos` en tu web (cuando quieras hacerlo público) + páginas de producto | Tu marca y tu SEO, no los de un marketplace. |
| **Correo** | Brevo, MailerLite, Kit o similar | Lista + automatizaciones + etiquetas por producto comprado. |
| **Entrega de archivos** | La propia plataforma de cobro (descarga segura, enlaces caducables, claves de licencia) | Cero trabajo manual. |
| **Repositorios privados** | GitHub: invitación automática o descarga ZIP con versión | Las plantillas se actualizan desde el código fuente. |
| **Cursos y membresía** | Plataforma de cursos (Teachable, Podia, Thinkific, Hotmart o similar) **o** tu propia área privada con Next.js + autenticación + Stripe | Empezar con plataforma; migrar solo si los costes lo justifican. |
| **Soporte** | Base de conocimiento (Notion/página pública) + correo con respuestas guardadas | El soporte es lo que mata la pasividad. |
| **Analítica** | Analítica web + paneles de la plataforma + hoja de cálculo mensual | Ver la sección 14. |

### 2.1 Aspectos legales y de licencias (revisar con asesoría)

- **Derecho de desistimiento:** en la UE, para contenido digital entregado de inmediato, el comprador debe **aceptar expresamente** la entrega inmediata y reconocer que pierde el derecho de desistimiento. Ponlo como casilla en el pago (la mayoría de plataformas lo permiten).
- **Licencias claras en cada producto:** personal, comercial (un cliente final) y ampliada/agencia (varios clientes). Texto corto y en español. Ver el modelo en la sección 11.
- **Política de reembolso propia:** 14 días "sin preguntas" en productos de entrada genera confianza y apenas se usa. En plantillas, reembolso solo si no funciona y no lo podemos arreglar.
- **Contenido creado con IA** (prompts, imprimibles, ilustraciones): revisar los términos de la herramienta usada y cómo trata la plataforma de venta ese contenido; declararlo cuando se pida.
- **Datos personales:** el SaaS y la membresía tratan datos de terceros → aviso de privacidad y contrato de encargado del tratamiento (RGPD).
- **Fiscal:** ver la sección 9 del sistema general.

---

## 3. Activo 1 — Plantillas web

**Qué es:** plantillas profesionales en Next.js y/o Astro, extraídas de tus proyectos reales, con diseño propio, SEO local configurado, rendimiento alto y documentación excelente.

**Catálogo inicial**
| Producto | Contenido |
|---|---|
| **"Salón"** | Peluquería/estética/barbería: servicios con precios, equipo, galería, reseñas, botón de reserva (Booksy u otro), SEO local, blog |
| **"Comercio local"** | Tienda física: horario, mapa, catálogo destacado, ficha de Google, formulario |
| **"Consulta"** | Fisio, psicología, nutrición: servicios, profesionales, preguntas frecuentes, citas |
| **Pack completo** | Las 3 + componentes sueltos + vídeos de instalación |

### Hoja de ruta de creación
| Semana | Tarea |
|---|---|
| 1 | Elegir el mejor proyecto real. Quitar datos del cliente, textos y fotos (usa fotos con licencia o tus ilustraciones). Refactorizar a contenido configurable (un archivo de configuración o Markdown/JSON). |
| 2 | Pulir: accesibilidad, Lighthouse > 95, tema claro/oscuro, variables de color y tipografía fáciles de cambiar. Demo en vivo. |
| 3 | Documentación: instalación en 5 minutos, cambiar colores, contenido, desplegar en Vercel/Netlify/Cloudflare, conectar el dominio. Vídeo corto de 10 min. |
| 4 | Página de producto con capturas, demo, lista de funciones, licencias y preguntas frecuentes. Lanzamiento. |
| +6 sem. | Segunda plantilla **solo si** la primera supera 5 ventas (ver validación en el sistema general). |

### Estrategia de precios
| Licencia | Precio | Uso |
|---|---|---|
| Personal | 59 € | Un sitio propio |
| Comercial | 89 € | Un sitio para un cliente |
| Agencia / ilimitada | 199 € | Sitios ilimitados para clientes |
| Pack completo (agencia) | 299 € (vs. 597 € por separado) | |
| **Actualizaciones** | 12 meses incluidas; renovación opcional al 40 % del precio | **Ingreso recurrente** |

- Precio de lanzamiento: −30 % durante 7 días para la lista de correo.
- Ancla: muestra el precio de una web a medida ("una web así cuesta 900 € a medida") junto al de la plantilla.

### Plan de marketing
- **SEO:** página por plantilla orientada a "plantilla web peluquería Next.js", "plantilla Astro negocio local", "plantilla web barbería" + artículo "Cómo montar la web de tu salón en una tarde".
- **Escaparates:** demo en vivo con enlace en el pie ("Plantilla de Claudia Ibáñez"), galerías de plantillas de los propios frameworks (si aceptan de pago), comunidades de desarrolladores hispanohablantes.
- **Contenido:** vídeo "de cero a publicada en 15 minutos"; publicaciones de antes/después en LinkedIn e Instagram.
- **Recurso gratuito:** un componente suelto (p. ej., la sección de reseñas) gratis a cambio del correo.
- **Afiliados:** 30 % de comisión para creadores que enseñan Next.js/Astro.

### Sistema de entrega
1. Pago en la plataforma → correo automático con descarga ZIP versionada + clave de licencia.
2. Opcional: formulario para pedir acceso al repositorio privado de GitHub (automatizable con la API).
3. Acceso a la documentación en línea.
4. Etiqueta en la lista de correo ("compró plantilla Salón") → secuencia: día 1 instalación, día 3 truco de personalización, día 7 widget de tarjetas regalo (SaaS).

### Mantenimiento
| Tarea | Frecuencia | Tiempo |
|---|---|---|
| Actualizar dependencias y versión del framework | Trimestral | 2–3 h por plantilla |
| Soporte (dudas de instalación) | Continuo | 1–2 h/mes con buena documentación |
| Mejoras/nuevas secciones (justifican la renovación) | Semestral | 4–6 h |
| Revisar la demo en vivo | Mensual | 10 min |

**Estimación de ingresos (mes 12):** 10–15 ventas/mes × ~95 € de media = **950–1.400 €/mes**, más renovaciones de actualizaciones a partir del mes 13.

---

## 4. Activo 2 — Pack de prompts para negocios de cita previa

**Qué es:** biblioteca de prompts probados, en español, organizados por tarea, para que un dueño de salón use cualquier asistente de IA (ChatGPT, Claude, Gemini…) y haga en minutos lo que le cuesta horas.

**Contenido (≈ 120 prompts)**
| Bloque | Ejemplos |
|---|---|
| Reseñas | Responder reseñas positivas/negativas con el tono del negocio; pedir reseñas por WhatsApp |
| Google Business | 12 meses de publicaciones; descripciones de servicios con palabras clave locales |
| Instagram | Calendario de 30 días; textos para antes/después; ideas de reels |
| Web y SEO | Textos de servicios, preguntas frecuentes, artículos de blog locales |
| Ventas | Campañas de tarjetas regalo (Navidad, San Valentín, Día de la Madre); bonos; recuperar clientes inactivos |
| Atención | Mensajes de confirmación, recordatorio, no-show, políticas de cancelación |

Cada prompt: objetivo, prompt para copiar, variables a rellenar, ejemplo de resultado y consejo.

### Hoja de ruta de creación
| Semana | Tarea |
|---|---|
| 1 | Listar las 30 tareas de comunicación que más tiempo quitan a tus clientes (pregúntales). Escribir y probar los prompts en 2–3 asistentes. |
| 2 | Completar los 120, editar, añadir ejemplos reales (anonimizados). Maquetar en Notion público + PDF. |
| 3 | Mini-pack gratuito de 10 prompts (imán de correo). Página de venta. Lanzamiento. |

### Estrategia de precios
- **Pack completo:** 24 €.
- **Pack + plantillas Canva** (activo 3) para las publicaciones: 39 €.
- **Mini-pack:** gratis (captación).
- Actualización anual gratuita para compradores (refuerza la recomendación boca a boca). Más adelante, el pack se convierte en **contenido de la membresía** (activo 6).

### Plan de marketing
- Imán de correo en los artículos del blog y en Instagram ("comenta PROMPTS y te lo envío").
- Contenido corto: "Así respondo a una reseña de 1 estrella en 30 segundos" (vídeo de pantalla).
- Colaboraciones con academias de peluquería/estética y distribuidores (regalo para sus alumnos/clientes con enlace de afiliado).
- Campañas estacionales: "Prompts para vender tarjetas regalo esta Navidad" (octubre-noviembre).

### Sistema de entrega
Pago → acceso a la página de Notion (enlace) + PDF descargable → secuencia de 3 correos de uso → oferta del pack con plantillas Canva o de la membresía.

### Mantenimiento
- Revisión semestral (2–3 h): los asistentes de IA cambian; actualizar los prompts que funcionen peor y añadir 10 nuevos.
- Soporte: casi nulo.

**Estimación (mes 12):** 15–30 ventas/mes × 24–39 € = **360–900 €/mes**. Su valor principal es **llenar la lista de correo**.

---

## 5. Activo 3 — Imprimibles y plantillas Canva para salones

**Qué es:** material listo para personalizar en Canva y para imprimir, con el mismo estilo visual cuidado de tus webs.

**Catálogo**
| Pack | Contenido |
|---|---|
| **Tarjetas regalo** | 12 diseños (Navidad, cumpleaños, San Valentín, Día de la Madre, genérica), formato tarjeta y A6, con espacio para código/QR |
| **Cartelería del salón** | Lista de precios, horario, normas de cita, "Déjanos tu reseña" con QR, wifi |
| **Redes sociales** | 60 plantillas de Instagram (servicios, antes/después, promociones, reseñas) |
| **Fidelización** | Tarjeta de sellos, bonos de sesiones, cupones |
| **Pack de temporada** | Navidad, rebajas, verano (se publica 6–8 semanas antes) |

### Hoja de ruta de creación
| Semana | Tarea |
|---|---|
| 1 | Definir 3 estilos visuales (natural/beige, moderno/negro, colorido). Diseñar el pack de tarjetas regalo en Canva. |
| 2 | Cartelería + tarjetas de sellos. Instrucciones de 1 página (cómo editar, imprimir, papel recomendado). |
| 3 | Mockups de producto (fotos de las tarjetas en un mostrador), página de venta, publicación en tu tienda y en un marketplace de imprimibles (Etsy o similar) para visibilidad. |
| Continuo | 1 pack de temporada cada trimestre. |

### Estrategia de precios
| Producto | Precio |
|---|---|
| Pack suelto | 9–15 € |
| Pack de redes sociales (60) | 19 € |
| **Mega pack** (todo + actualizaciones de temporada 12 meses) | 39 € |
| Diseño personalizado con su logo y colores (servicio) | 49–79 € |

### Plan de marketing
- **Marketplace (Etsy o similar):** búsquedas como "tarjeta regalo peluquería editable", "lista de precios salón Canva". Títulos y etiquetas en español **y** en inglés (otro mercado más con el mismo producto).
- **Pinterest:** muy fuerte para imprimibles; 3–5 pines por producto enlazando a tu tienda.
- **Gancho hacia el SaaS:** en cada pack de tarjetas regalo, una página "¿Quieres vender estas tarjetas online, con pago y canje automático?".
- **Venta en persona:** regálalo a clientes de tus webs y planes de cuidado (aumenta el valor percibido).

### Sistema de entrega
PDF con **enlaces de plantilla de Canva** ("usar como plantilla", que crea una copia en la cuenta del comprador) + PDF imprimible en alta resolución. Entrega automática desde la plataforma o el marketplace.

### Mantenimiento
- Comprobar que los enlaces de Canva siguen funcionando: trimestral, 30 min.
- 1 pack de temporada por trimestre: 4–6 h.
- Respuesta a mensajes del marketplace: 30 min/semana (agrupar en un único bloque).

**Estimación (mes 12):** 30–60 ventas/mes × ~15 € = **450–900 €/mes** (volumen; picos fuertes en noviembre-diciembre).

---

## 6. Activo 4 — eBook / guía "Aparece en Google Maps en 7 días"

**Qué es:** guía paso a paso para dueños de negocios locales, basada en tu artículo que ya posiciona. Formato PDF + lista de verificación imprimible + plantillas.

**Índice**
1. Por qué Google Maps te trae más clientes que Instagram.
2. Día 1: crear o reclamar el Perfil de Empresa de Google.
3. Día 2: categorías, servicios y descripción (con plantillas).
4. Día 3: fotos que funcionan.
5. Día 4: el sistema para conseguir reseñas cada semana (con mensajes listos).
6. Día 5: publicaciones y preguntas frecuentes.
7. Día 6: conectar web y ficha (y por qué importa).
8. Día 7: medir y mantener (10 minutos por semana).
9. Anexos: lista de verificación, 20 respuestas a reseñas, calendario de publicaciones.

### Hoja de ruta de creación
| Semana | Tarea |
|---|---|
| 1 | Ampliar el artículo del blog a 40–60 páginas; capturas actualizadas. |
| 2 | Maquetar (Canva o tu propio diseño), lista de verificación, plantillas. Revisión por 2–3 dueños de negocio. |
| 3 | Página de venta + versión gratuita (lista de verificación) + lanzamiento a la lista. |

### Estrategia de precios
| Versión | Precio |
|---|---|
| Lista de verificación | Gratis (imán) |
| eBook | 19 € |
| eBook + pack de prompts + plantillas Canva para Google Business | 39 € |
| eBook + revisión de su ficha en vídeo de 15 min (semi-pasivo, plazas limitadas) | 89 € |

### Plan de marketing
- Llamada a la acción al final de **todos** los artículos del blog relacionados.
- Versión "local" en los artículos de Pamplona/Navarra + versión general para toda España.
- Instagram/LinkedIn: carrusel "7 errores en tu ficha de Google".
- Ofrecer la guía como regalo a asociaciones de comerciantes (a cambio de difusión a sus socios).

### Sistema de entrega
Pago → descarga PDF + enlaces → secuencia de 7 correos (uno por día, acompañando la guía) → el día 8, oferta de la membresía "Negocio visible".

### Mantenimiento
- Revisión semestral: Google cambia la interfaz del Perfil de Empresa → actualizar capturas y pasos (3–4 h).
- Avisar a los compradores de la nueva edición (genera confianza y ventas cruzadas).

**Estimación (mes 12):** 15–30 ventas/mes × ~25 € de media = **375–750 €/mes**.

---

## 7. Activo 5 — Software (micro-SaaS): tarjetas regalo, bonos y reseñas

> Descrito en profundidad en la sección 4B del sistema general. Aquí, resumen operativo.

**Qué es:** aplicación web para negocios de cita previa: vender tarjetas regalo y bonos online con pago (Stripe Connect), canje desde el móvil y widget de reseñas de Google para su web.

### Hoja de ruta de creación
| Fase | Duración | Hito |
|---|---|---|
| Validación | 4–6 semanas | 15 entrevistas + ≥ 10 preventas "precio fundador" |
| MVP | 6–8 semanas | Tarjetas regalo + canje + widget, en uso por 3–5 negocios fundadores |
| Beta pagada | 2–3 meses | 10–20 clientes, iteración semanal según su uso |
| Producto | Mes 9+ | Bonos de sesiones, petición automática de reseñas, informes, multi-local |

### Estrategia de precios
| Plan | Mensual | Anual |
|---|---|---|
| Inicio | 19 € | 190 € |
| Negocio | 39 € | 390 € |
| Multi-local | 79 € | 790 € |
| Fundadores (primeros 20) | 15 € de por vida | — |

Prueba gratuita de 14 días sin tarjeta, o "gratis hasta tu primera venta de tarjeta regalo" (prueba ambas en la beta).

### Plan de marketing
- Embudo desde todos los activos anteriores (plantillas, imprimibles, eBook, prompts).
- SEO de intención de compra: "vender tarjetas regalo online peluquería", "bonos de sesiones online estética", "widget reseñas Google web".
- Campañas de temporada 6 semanas antes de Navidad, San Valentín y el Día de la Madre.
- Referidos: 1 mes gratis para ambos.
- Casos de éxito con cifras ("Este salón vendió 1.400 € en tarjetas regalo en diciembre").

### Sistema de entrega
Alta autoservicio → asistente de configuración en 10 minutos → conexión de Stripe → widget con una línea de código o página alojada → correo de bienvenida + vídeo de 3 min.

### Mantenimiento
| Tarea | Tiempo/mes |
|---|---|
| Soporte (crece con los clientes; objetivo < 1 h por cada 20 clientes) | 1–4 h |
| Actualizaciones de seguridad y dependencias | 2 h |
| Monitorización, copias, incidencias | 1 h (automatizado) |
| Nuevas funciones | Las horas del bloque de construcción cuando sea el activo activo |

**Estimación (mes 12):** 20–40 clientes × ~30 € = **600–1.200 €/mes recurrentes**.

---

## 8. Activo 6 — Membresía "Negocio visible"

**Qué es:** suscripción mensual para dueños de negocios de cita previa que reciben **cada mes, hecho y listo para usar**, todo lo necesario para estar visibles en internet. Es "contenido hecho por ti", no una comunidad que tengas que animar a diario.

**Qué recibe el miembro cada mes**
1. **Kit mensual:** 12 publicaciones de Instagram + 4 de Google Business (plantillas Canva + textos), adaptadas a la temporada.
2. **Campaña del mes:** p. ej., "Vende bonos en enero", "Tarjetas del Día de la Madre", con correos, carteles y textos.
3. **Tarea de 15 minutos** para mejorar su visibilidad (con vídeo corto).
4. **Biblioteca completa:** pack de prompts, eBook, imprimibles (todo lo anterior incluido).
5. **Sesión mensual en directo** de 45 min (preguntas y revisión de fichas/webs de los miembros), grabada.

### Hoja de ruta de creación
| Fase | Tarea |
|---|---|
| Mes −1 | Validar: oferta a la lista de correo como "miembros fundadores" con precio especial. Objetivo: ≥ 15 altas antes de producir más de 1 mes de contenido. |
| Mes 0 | Preparar **3 meses de contenido por adelantado** (colchón). Área privada en la plataforma de cursos o Notion + Stripe. |
| Continuo | Producir cada mes el kit del mes +2 (siempre 2 meses por delante). |

### Estrategia de precios
| Plan | Precio |
|---|---|
| Mensual | 19 €/mes |
| Anual | 190 €/año (2 meses gratis) + curso incluido |
| Fundadores (primeros 30) | 12 €/mes de por vida |
| **Combinado con el SaaS** | Plan Negocio + membresía: 49 €/mes (en vez de 58 €) |

### Plan de marketing
- Secuencias de correo de los compradores de eBook, prompts e imprimibles (son el público exacto).
- Muestra gratuita: el kit de un mes entero como imán de correo.
- Clientes de planes de cuidado web: incluida en el plan "Pro" o como añadido.
- Testimonios de resultados ("+23 reseñas en 3 meses").
- **Retención:** correo mensual "esto es lo que tienes este mes"; recordar el valor acumulado; ofrecer pausa en vez de baja.

### Sistema de entrega
Pago (Stripe/plataforma) → acceso al área privada → correo el día 1 de cada mes con el kit → recordatorio de la sesión en directo → grabación disponible en 24 h.

### Mantenimiento
| Tarea | Tiempo/mes |
|---|---|
| Producción del kit mensual (plantillas + textos + campaña + vídeo de tarea) | 6–8 h (bajar a 4–5 h con prompts y plantillas base) |
| Sesión en directo | 1 h + 30 min de preparación |
| Soporte y comunidad | 1 h |
| **Total** | **8–10 h/mes** → es **semi-pasivo**; solo compensa con ≥ 40 miembros |

**Estimación (mes 12):** 30–60 miembros × ~17 € = **510–1.020 €/mes recurrentes**.
**Regla de corte:** si a los 4 meses del lanzamiento hay < 25 miembros, se pausa y el contenido creado se reempaqueta como packs de temporada (activo 3).

---

## 9. Activo 7 — Curso en línea

Dos cursos posibles; **se construye solo uno**, el que pida la lista de correo (encuesta en el mes 6).

| | **Curso A: "Tu negocio, lleno desde internet"** | **Curso B: "Webs para negocios locales que se venden solas"** |
|---|---|---|
| Público | Dueños de negocios de cita previa | Freelances y desarrolladores web |
| Promesa | Más clientes con Google Maps, web, reseñas y tarjetas regalo, en 4 semanas, sin saber de tecnología | Conseguir clientes locales, vender planes recurrentes y entregar rápido con plantillas |
| Encaje | Público principal; alimenta membresía y SaaS | Usa tu experiencia real; alimenta plantillas y licencias |
| Precio | 97–147 € | 197–297 € |

### Hoja de ruta de creación (para cualquiera de los dos)
| Semana | Tarea |
|---|---|
| 1 | **Preventa:** página con temario + precio de lanzamiento (−40 %) para la lista. Objetivo ≥ 20 ventas antes de grabar. Si no se alcanza, devolver el dinero y no grabar. |
| 2–5 | **Primera edición en directo** (4 sesiones semanales por videollamada) con los compradores de la preventa. Se graba todo. |
| 6–7 | Editar las grabaciones en lecciones de 5–12 min; añadir plantillas, ejercicios y resúmenes. |
| 8 | Publicar como curso grabado *evergreen* con embudo automático. |

Ventaja de grabar en directo: no hay riesgo de crear algo que nadie quiere, el contenido sale mejorado con las preguntas reales y obtienes testimonios.

### Estrategia de precios
- Preventa / primera cohorte: −40 %.
- *Evergreen:* precio completo; 2 aperturas al año con bonos (sesión en directo de preguntas) para crear urgencia real.
- Pago en 3 cuotas sin recargo (aumenta la conversión en tickets > 100 €).
- Incluido en la membresía anual (activo 6) o con descuento para miembros.
- Licencia de equipo (curso A para cadenas o academias): 3–5 alumnos 297 €.

### Plan de marketing
- **Webinar automatizado** (o en directo una vez al trimestre): "Los 3 cambios que llenan la agenda de un salón" → oferta del curso.
- Lista de correo + secuencia de lanzamiento de 7 días.
- Afiliados: academias de estética (curso A); creadores de contenido de desarrollo (curso B), con 30–40 % de comisión.
- Testimonios de la primera cohorte en vídeo.

### Sistema de entrega
Plataforma de cursos: pago → acceso inmediato → lecciones con progreso → plantillas descargables → correos de seguimiento por módulo → certificado al terminar (curso B).

### Mantenimiento
- Revisión anual del contenido (10–15 h): regrabar las lecciones obsoletas (capturas de Google, cambios de herramientas).
- Preguntas de alumnos: 1–2 h/mes, mejor en una sesión mensual o trimestral conjunta que por correo individual.
- Lanzamientos: 2 al año × 10 h.

**Estimación (año 1, a partir del mes 10):** 20 ventas en preventa + 5–15/mes *evergreen* × ~120 € = **600–1.800 €/mes** de media en meses de venta (irregular; concentrado en lanzamientos).

---

## 10. Activo 8 — Recursos de stock

Tu web ya usa **ilustraciones propias** (la chica pensando, señalando, con portátil). Es un estilo reconocible y vendible.

**Catálogo**
| Pack | Contenido |
|---|---|
| **Ilustraciones "Pequeño negocio"** | 30 ilustraciones (personajes trabajando, en el salón, con el móvil, atendiendo) en SVG/PNG, colores editables |
| **Mockups de webs** | Dispositivos (móvil, portátil, tableta) en escenarios cálidos para presentar webs a clientes; PSD/Figma/PNG |
| **Kit de iconos** | 120 iconos para negocios locales (servicios de peluquería, estética, horarios, reservas) en SVG |
| **Kit de presentación para freelances** | Plantilla Figma de propuesta y presupuesto web (la que usas tú, limpia) |

### Hoja de ruta de creación
| Fase | Tarea |
|---|---|
| Mes 4 (ratos libres, 2 h/sem.) | Reunir y normalizar las ilustraciones existentes (mismo trazo, paleta, formatos). Completar hasta 30. |
| Mes 5 | Mockups con tus propias fotos/escenarios. Página de producto con vista previa. |
| Continuo | 5 ilustraciones nuevas por trimestre (sirven para tu propio contenido también). |

> Si alguna ilustración se creó con herramientas de IA, revisa sus términos de uso comercial y si el marketplace donde vendas acepta este tipo de contenido y cómo hay que declararlo.

### Estrategia de precios
| Producto | Personal | Comercial | Ampliada (productos para reventa) |
|---|---|---|---|
| Pack de ilustraciones | 19 € | 39 € | 149 € |
| Mockups | 15 € | 29 € | — |
| Iconos | 12 € | 24 € | 99 € |
| **Todo el stock + futuras ampliaciones** | — | 79 € | 249 € |

Además: subir una selección a marketplaces de stock y diseño (Creative Market, UI8, Envato o similares) para cola larga.

### Plan de marketing
- Usarlas en todos tus productos (plantillas, eBook) con el crédito "Ilustraciones de este pack".
- Comunidades de diseño (Dribbble, Behance, Figma Community: versión gratuita reducida con enlace al pack completo).
- Pinterest para mockups.
- Paquete "freebie" de 5 ilustraciones a cambio del correo (lista de freelances).

### Sistema de entrega
Pago → ZIP (SVG, PNG, archivos fuente) + archivo de licencia + enlace a Figma Community o archivo duplicable.

### Mantenimiento
- Muy bajo: 1–2 h/trimestre (ampliaciones, responder alguna consulta de licencia).

**Estimación (mes 12):** **150–500 €/mes** (cola larga, crece despacio pero casi sin trabajo).

---

## 11. Activo 9 — Licenciamiento

El licenciamiento convierte tus activos en ingresos de **alto valor y recurrentes** vendiendo derechos de uso a empresas, no a usuarios finales.

### 11.1 Oportunidades
| Oportunidad | Comprador | Modelo |
|---|---|---|
| **SaaS en marca blanca** | Agencias de marketing, consultoras de estética, distribuidores de productos de peluquería | Cuota de alta 500–1.500 € + 99–299 €/mes según volumen de locales; su logo y dominio |
| **Licencia de agencia de plantillas** | Agencias web | 499 €/año: todas las plantillas actuales y futuras, clientes ilimitados |
| **Licencia de contenidos de la membresía** | Distribuidores, academias, asociaciones de comerciantes, franquicias | 1.500–3.000 €/año: redistribuir el kit mensual a sus clientes/socios con su marca |
| **Licencia del curso A** | Academias de estética, escuelas de FP, cámaras de comercio | 50–100 € por alumno o tarifa anual |
| **Ilustraciones/mockups** | Empresas de software, editoriales | Licencias ampliadas o encargos de colección exclusiva |

### 11.2 Hoja de ruta de creación
| Mes | Tarea |
|---|---|
| 9 | Documento de 1 página por oferta de licencia (qué incluye, precio, condiciones). Contrato tipo revisado por un abogado (uso, territorio, duración, exclusividad, soporte, marca). |
| 9–10 | Lista de 30 posibles licenciatarios (empieza por Navarra y por quien ya conoce tus productos). Contacto directo personalizado. |
| 10–12 | Cerrar 1–2 acuerdos piloto con condiciones especiales a cambio de testimonio y feedback. |
| 12+ | Página "Para agencias y empresas" con formulario. |

### 11.3 Estrategia de precios
- **Nunca por horas.** Por valor: número de locales, alumnos o socios que acceden.
- Alta + cuota recurrente (anual pagada por adelantado con 10–15 % de descuento).
- **Exclusividad** (territorial o sectorial) solo con un recargo de 2–3× y por plazo limitado.
- Revisión de precio anual en el contrato.

### 11.4 Plan de marketing
- Venta directa B2B (LinkedIn, correo personalizado, presentaciones en ferias o asociaciones de comercio y estética).
- Casos de éxito del SaaS y de la membresía como prueba.
- Los compradores de la licencia de agencia de plantillas son los mejores candidatos a la marca blanca del SaaS.

### 11.5 Sistema de entrega
Contrato firmado electrónicamente → factura de alta → configuración de la marca blanca (subdominio, logo, colores; automatizar en el SaaS) o acceso al paquete de contenidos con marca → llamada de arranque → informe trimestral de uso.

### 11.6 Mantenimiento
- 1–2 h/mes por licenciatario (relación, informes, dudas).
- Renovaciones: aviso 60 días antes.
- Cumplimiento: revisión anual de que el uso se ajusta al contrato.

**Estimación (mes 12–18):** 2–4 licencias × 150–300 €/mes = **300–1.200 €/mes recurrentes**.

### 11.7 Modelo de licencias para tus productos (resumen)
| Licencia | Permite | No permite |
|---|---|---|
| **Personal** | Uso en un proyecto propio | Uso para clientes, reventa |
| **Comercial** | Un proyecto para un cliente final | Reventa del archivo, plantillas o productos derivados para la venta |
| **Agencia / ampliada** | Proyectos ilimitados para clientes | Redistribuir el archivo original, incluirlo en otro producto de plantillas a la venta |
| **Marca blanca / empresa** | Según contrato | Según contrato |

---

## 12. Calendario de lanzamiento (12 meses)

Encaja con el plan de 90 días del sistema general (los planes de cuidado web van en paralelo, porque se apoyan en clientes actuales).

| Mes | Construcción (un foco) | Lanzamientos / mantenimiento | Temporada |
|---|---|---|---|
| **1** | Plantilla "Salón" | Planes de cuidado web (sistema general) | — |
| **2** | Pack de prompts + imprimibles de tarjetas regalo | Lanzar plantilla; entrevistas del SaaS | Preparar Navidad |
| **3** | eBook Google Maps | Lanzar prompts e imprimibles (**pack Navidad**); preventa del SaaS | Navidad (venta de imprimibles) |
| **4** | MVP del SaaS | Lanzar eBook; ilustraciones en ratos libres | Navidad: piloto del SaaS con fundadores |
| **5** | MVP del SaaS | Pack de San Valentín | — |
| **6** | Membresía (3 meses de contenido por adelantado) | Encuesta para elegir curso; beta pagada del SaaS | San Valentín |
| **7** | Membresía: lanzamiento de fundadores | Segunda plantilla (si la primera validó); stock | Día de la Madre (preparar) |
| **8** | Curso: preventa | Pack del Día de la Madre; campaña SaaS | Día de la Madre |
| **9** | Curso: edición en directo | Documentos de licencias | — |
| **10** | Curso: edición y *evergreen* | Contacto con licenciatarios | Verano |
| **11** | Mejoras del SaaS (bonos, petición de reseñas) | Pilotos de licencias | Preparar Navidad |
| **12** | Revisión anual y consolidación | Gran campaña de Navidad en todos los activos | Navidad |

> Los meses del calendario son relativos. Si empiezas en octubre-noviembre, aprovecha que **la Navidad es la temporada fuerte de tarjetas regalo**: adelanta los imprimibles de tarjetas regalo y el piloto del SaaS.

---

## 13. Presupuesto de mantenimiento (cuando todo esté en marcha)

| Activo | Horas/mes | Ingreso estimado con el activo maduro (6–12 meses en venta) | € por hora de mantenimiento |
|---|---|---|---|
| Plantillas web | 3–4 | 950–1.400 € | ~300 € |
| Pack de prompts | 0,5 | 360–900 € | > 700 € |
| Imprimibles | 3 | 450–900 € | ~225 € |
| eBook | 0,5 | 375–750 € | > 700 € |
| SaaS | 4–7 | 600–1.200 € | ~165 € |
| Membresía | 8–10 | 510–1.020 € | ~85 € |
| Curso (promedio anual) | 3–4 | 600–1.800 € (en meses de venta) | ~250 € |
| Stock | 0,5 | 150–500 € | > 500 € |
| Licencias | 2–6 | 300–1.200 € | ~150 € |
| **Total** | **~25–35 h/mes** | | |

**Lectura:** el catálogo completo cabe en el tiempo disponible (8–10 h/semana ≈ 35–40 h/mes), pero deja poco margen para construir cosas nuevas. Por eso:
- La **membresía** es el activo menos pasivo: vigílala. Si no supera los 40 miembros, su tiempo rinde más en el SaaS o en plantillas.
- No hace falta tener los 9 activos. **Si al mes 12 cinco de ellos producen el 80 % de los ingresos, se congelan los demás.**

**Cifras de ingresos:** son estimaciones de planificación para cada activo **ya maduro**. En el mes 12 varios llevan poco tiempo en venta (membresía, curso, licencias) y otros pueden no haber superado su validación, así que la suma de la tabla no es el ingreso del mes 12. Escenario base realista a 12 meses: **2.000–2.800 €/mes**; a 24 meses, con el SaaS, la membresía y las licencias maduros: **4.000–6.000 €/mes**.

---

## 14. Cuadro de mando de los activos digitales

Una pestaña nueva en la hoja del sistema general.

| Métrica | Por qué importa | Objetivo mes 12 |
|---|---|---|
| Suscriptores de la lista de correo | Es el activo que vende todos los demás | 1.000 |
| Conversión imán → correo | Salud del embudo | ≥ 2 % de las visitas al artículo |
| Conversión lista → primera compra (90 días) | Calidad de la oferta de entrada | ≥ 5 % |
| Ventas por producto / mes | Qué funciona | Ver objetivos de cada activo |
| Ingreso medio por comprador | Si suben peldaños | ≥ 45 € |
| % compradores que compran un segundo producto | Fuerza del ecosistema | ≥ 20 % |
| MRR (SaaS + membresía + licencias + renovaciones) | Lo verdaderamente recurrente | ≥ 1.200 € |
| Baja mensual membresía / SaaS | Retención | < 6 % / < 4 % |
| Tasa de reembolsos | Calidad y expectativas | < 3 % |
| Horas de mantenimiento / mes | Pasividad real | < 35 h |
| € por hora de mantenimiento por activo | Dónde poner el tiempo | ≥ 80 € |

**Reglas de decisión:** las mismas del sistema general (duplicar, mantener, pivotar, matar), aplicadas a cada activo cada trimestre.

---

## 15. Próximos 14 días

1. **Día 1:** elegir el proyecto real que se convertirá en la plantilla "Salón" y pedir permiso al cliente si el diseño es reconocible.
2. **Día 2:** crear la cuenta en la plataforma de venta (*merchant of record*) y en la herramienta de correo.
3. **Día 3:** escribir el texto de las licencias (sección 11.7) y la política de reembolso.
4. **Días 4–8:** limpiar y configurar la plantilla (sección 3, semana 1).
5. **Día 9:** preguntar a 5 clientes qué tareas de comunicación les quitan más tiempo (base del pack de prompts).
6. **Día 10:** crear el imán de correo (lista de verificación de Google Maps) y ponerlo en los 3 artículos del blog con más visitas.
7. **Días 11–13:** diseñar el pack de tarjetas regalo imprimibles de Navidad (hay que publicarlo antes de mediados de noviembre).
8. **Día 14:** revisión: ¿se va cumpliendo el plan? Ajustar el calendario.

---

### Advertencia

Precios, conversiones e ingresos son **hipótesis de planificación** basadas en rangos habituales de productos digitales similares, no datos de mercado verificados. Valida cada activo con su prueba antes de invertir tiempo de verdad y sustituye las cifras por tus datos reales. Las referencias legales y fiscales son orientativas: confírmalas con tu asesoría o un abogado, sobre todo los contratos de licencia y el tratamiento de datos.
