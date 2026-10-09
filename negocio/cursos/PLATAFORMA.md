# Plataforma de cursos en claudiaibanez.com · Puesta en marcha

> Documento interno. Explica cómo funciona la plataforma, qué cuentas hay que crear y qué configurar para empezar a vender.

## 0. Antes de nada: haz privado el repositorio

El repositorio `cibanez93/Portfolio-Claudia` es **público** en GitHub. Eso significa que cualquiera puede leer en github.com el contenido de los cursos (`contenido-cursos/`, `alumnos/`) y los documentos de negocio (`negocio/`), aunque en la web estén protegidos.

**Hazlo privado:** GitHub → el repositorio → *Settings* → abajo del todo, *Danger Zone* → *Change repository visibility* → *Make private*.

Cloudflare Pages sigue funcionando igual con repositorios privados. Hasta que no lo hagas, **no publiques el curso**.

---

## 1. Cómo funciona

```
Página de venta ──(botón Comprar)──▶ /api/checkout ──▶ Stripe Checkout (pago, IVA, factura)
                                                          │
                       ┌──────────────────────────────────┴──────────────────┐
                       ▼                                                      ▼
            /api/bienvenida (vuelta tras pagar)                  /api/stripe-webhook (Stripe avisa)
            da acceso y abre la sesión                           da acceso + correo de bienvenida
                       │                                                      │
                       └──────────────▶ Cloudflare KV: alumno:<email> = { cursos: [...] } ◀┘
                                                          │
/acceso ──(correo)──▶ /api/login ──▶ correo con enlace ──▶ /api/entrar ──▶ cookie de sesión (6 meses)
                                                          │
/alumnos/<curso>/<lección>  ◀── protegido por functions/alumnos/_middleware.js
                                (sin sesión → /acceso · sin el curso → página de venta)
                                y vídeos de Cloudflare Stream con URL firmada que caduca en 6 h
```

| Pieza | Dónde está |
|---|---|
| Lógica (pago, accesos, correos) | `functions/` (Cloudflare Pages Functions) |
| Catálogo de cursos, precios de Stripe e IDs de vídeos | `functions/_lib/catalogo.js` |
| Contenido de cada curso (lo que escribes tú) | `contenido-cursos/<id>.md` |
| Páginas del área de alumnos (generadas) | `alumnos/<id>/` → `npm run build:cursos` |
| Panel "Mis cursos" y acceso | `alumnos/index.html`, `acceso.html` |
| Páginas públicas | `cursos.html` (catálogo), `curso-google-maps.html` (venta), `condiciones-cursos.html` |
| Documentos internos | `negocio/` (la web devuelve 404) |

**Sin contraseñas:** el alumno entra con un enlace que le llega al correo (caduca en 30 minutos) y su sesión dura 6 meses en ese dispositivo.
**Reembolsos:** si haces un reembolso total en Stripe, el acceso a ese curso se retira solo.
**Progreso:** lecciones completadas y casillas se guardan en el navegador del alumno.

---

## 2. Cuentas que necesitas (todas tienen plan gratuito o pago por uso)

| Servicio | Para qué | Coste aproximado (revisa sus tarifas actuales) |
|---|---|---|
| **Cloudflare** (ya lo usas) | Web, Functions, KV (alumnos), Stream (vídeos) | Pages y KV: gratis a tu volumen. Stream: de pago por minutos guardados y minutos vistos (unos pocos euros al mes al principio) |
| **Stripe** | Cobro con tarjeta, Apple Pay, Google Pay y facturas | Comisión por transacción (en tarjetas europeas, en torno al 1,5 % + 0,25 €) |
| **Resend** | Correos de acceso y bienvenida | Gratis hasta unos miles de correos al mes |

---

## 3. Configuración paso a paso

### 3.1 Cloudflare Pages
1. Comprueba que la web está en **Cloudflare Pages** (panel de Cloudflare → *Workers & Pages* → tu proyecto). La carpeta `functions/` solo funciona en Cloudflare Pages.
2. **Configuración de compilación:** no hace falta comando de compilación. Las páginas de los cursos se generan en tu ordenador con `npm run build:cursos` y se suben ya hechas.
3. **KV:** *Workers & Pages* → *KV* → *Create namespace* → nombre `alumnos`. Después, en el proyecto de Pages → *Settings* → *Bindings* → *Add* → *KV namespace* → nombre de variable **`ALUMNOS`** → elige `alumnos`. Hazlo en *Production* y en *Preview*.

### 3.2 Variables de entorno
Proyecto de Pages → *Settings* → *Variables and Secrets*. Márcalas como **Secret** las que lo son:

| Variable | Qué es | Secreta |
|---|---|---|
| `SESSION_SECRET` | Texto aleatorio largo (40+ caracteres) para firmar sesiones. Genera uno con un gestor de contraseñas. Si lo cambias, se cierran todas las sesiones. | Sí |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe (`sk_live_...`; para probar, `sk_test_...`) | Sí |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` del webhook (paso 3.3) | Sí |
| `RESEND_API_KEY` | Clave de Resend (`re_...`) | Sí |
| `MAIL_FROM` | Remitente, p. ej. `Claudia Ibáñez <cursos@claudiaibanez.com>` | No |
| `MAIL_REPLY_TO` | A dónde llegan las respuestas, p. ej. `cibanez.dev@outlook.com` | No |
| `STREAM_CUSTOMER_CODE` | El código de tu cuenta de Stream (lo ves en la URL de cualquier vídeo: `customer-XXXX.cloudflarestream.com`) | No |
| `STREAM_KEY_ID` | ID de la clave de firma de Stream (paso 3.5) | No |
| `STREAM_KEY_JWK` | La clave de firma (campo `jwk`, tal cual, en base64) | Sí |

### 3.3 Stripe
1. Crea la cuenta y actívala con tus datos de autónoma.
2. **Ajustes → Datos públicos de la empresa:** nombre, web, correo de soporte y **URL de las condiciones del servicio**: `https://claudiaibanez.com/condiciones-cursos` (hace falta para la casilla de aceptación del pago).
3. **Producto:** *Catálogo de productos* → *Añadir producto* → «Aparece en Google Maps en 7 días» → precio único **19,00 EUR**, con el **IVA incluido** en el precio (en la configuración de impuestos del precio, «incluido»). Copia el ID del precio (`price_...`) en `functions/_lib/catalogo.js`.
4. **Facturas:** en *Ajustes → Facturación → Facturas*, pon tus datos fiscales (NIF, dirección) y la numeración. El checkout ya pide a Stripe que genere la factura de cada compra.
5. **Webhook:** *Desarrolladores → Webhooks → Añadir destino* → URL `https://claudiaibanez.com/api/stripe-webhook` → eventos `checkout.session.completed`, `checkout.session.async_payment_succeeded` y `charge.refunded`. Copia el secreto de firma en `STRIPE_WEBHOOK_SECRET`.
6. **Prueba en modo test** antes de nada: usa las claves `sk_test_`, un precio de test y la tarjeta `4242 4242 4242 4242`. Puedes probar en una URL de *preview* de Pages.

### 3.4 Resend
1. Crea la cuenta → *Domains* → añade `claudiaibanez.com` → crea los registros DNS que te indique en Cloudflare (se verifica en minutos).
2. Crea una API key con permiso de envío → `RESEND_API_KEY`.
3. Sin esto la plataforma funciona, pero no se envían correos (se ve en los registros como «correo sin enviar»).

### 3.5 Cloudflare Stream (vídeos)
1. Panel de Cloudflare → *Stream* → activa el servicio.
2. Sube cada vídeo y, en sus ajustes, activa **«Require Signed URLs»**. Así solo se pueden ver desde el área de alumnos.
3. Crea una clave de firma (una sola vez) con la API de Stream: `POST /accounts/<cuenta>/stream/keys`. La respuesta trae `id` → `STREAM_KEY_ID` y `jwk` → `STREAM_KEY_JWK`. (Si te resulta lioso, te lo hago yo cuando tengas la cuenta.)
4. Copia el ID de cada vídeo en `functions/_lib/catalogo.js`, en `videos`, con la clave de la lección: `"bienvenida"`, `"dia-1"`, … `"terminado"`.
5. Mientras un vídeo no esté, la lección muestra «El vídeo de esta lección estará disponible muy pronto».

### 3.6 Probar en tu ordenador (opcional)
```bash
npm install
cp .dev.vars.example .dev.vars   # rellena SESSION_SECRET y lo que quieras probar
npm run dev                      # abre http://localhost:8788
```

---

## 4. Tareas del día a día

| Quiero… | Cómo |
|---|---|
| **Añadir un curso nuevo** | 1) Escribe `contenido-cursos/<id>.md` (mismo formato que `google-maps.md`). 2) `npm run build:cursos`. 3) Añádelo en `functions/_lib/catalogo.js` con su precio de Stripe. 4) Crea su página de venta (copia `curso-google-maps.html`) y añádelo a `cursos.html`. |
| **Cambiar el texto de una lección** | Edita el `.md` y vuelve a ejecutar `npm run build:cursos`. |
| **Dar acceso gratis** (regalo, colaboración, venta por Bizum) | Cloudflare → *KV* → `alumnos` → *Add entry*: clave `alumno:correo@ejemplo.com`, valor `{"email":"correo@ejemplo.com","cursos":["google-maps"]}` (o `["*"]` para todos). La persona entra desde `/acceso`. |
| **Quitar un acceso** | Borra esa entrada en KV (o haz el reembolso total en Stripe). |
| **Devolver el dinero** (garantía) | Stripe → el pago → *Reembolsar* (total). El acceso se retira solo. |
| **Hacer un descuento** | Stripe → *Cupones* → crea un código promocional. En el pago hay un campo para introducirlo. |
| **Vender el pack de todos los cursos** | Crea el precio en Stripe y ponlo en `PACK.precio` en `catalogo.js`. En la página, un formulario con `curso` = `todos`. |

---

## 5. Impuestos y facturas (confirma con tu asesoría)

- **IVA:** los precios llevan el 21 % de IVA incluido. Mientras tus ventas a particulares de otros países de la UE no superen **10.000 € al año**, puedes aplicar el IVA español a todos. Por encima, hay que aplicar el IVA del país del comprador (régimen de ventanilla única, OSS). Stripe Tax puede calcularlo cuando llegue el momento.
- **Facturas:** Stripe emite una factura por cada venta. Comprueba con tu asesoría que cumplen los requisitos (factura simplificada a particulares, completa a empresas con NIF) y cómo encajan con **Verifactu**, la obligación de software de facturación verificable, que para autónomos entra en vigor próximamente (confirma la fecha). Puede que tengas que emitir las facturas desde tu programa de facturación habitual.
- **Ventas en Udemy, Hotmart y otras plataformas:** ahí la venta la hace la plataforma; tú le facturas a ella tu parte. Pregunta a tu asesoría por el tratamiento del IVA (algunas, como Udemy, son empresas de fuera de la UE).

---

## 6. Seguridad y límites (para tu tranquilidad)

- Las sesiones y los enlaces van firmados con `SESSION_SECRET`; no se pueden falsificar.
- El webhook comprueba la firma de Stripe; nadie puede darse acceso llamándolo.
- `/api/login` responde lo mismo exista o no el correo (no revela quién ha comprado) y limita a un enlace cada 2 minutos por correo.
- Los vídeos firmados caducan a las 6 horas: compartir el enlace del vídeo no sirve de mucho.
- **Lo que no se puede evitar:** que alguien grabe la pantalla o comparta su cuenta. Es así en todas las plataformas; las condiciones de compra lo prohíben y puedes retirar el acceso.
