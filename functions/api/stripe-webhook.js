// POST /api/stripe-webhook
// Eventos: checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded
import {
  verificarFirmaStripe, darAcceso, quitarCurso, stripe, enlaceAcceso, enviarCorreo, plantillaCorreo,
} from "../_lib/curso.js";
import { productoPorId } from "../_lib/catalogo.js";

export async function onRequestPost({ request, env }) {
  const cuerpo = await request.text();
  if (!(await verificarFirmaStripe(env, cuerpo, request.headers.get("Stripe-Signature")))) {
    return new Response("Firma no válida", { status: 400 });
  }
  const evento = JSON.parse(cuerpo);
  const obj = evento.data?.object || {};
  const origin = new URL(request.url).origin;

  if (
    (evento.type === "checkout.session.completed" || evento.type === "checkout.session.async_payment_succeeded") &&
    obj.payment_status === "paid"
  ) {
    const email = obj.customer_details?.email;
    const producto = productoPorId(obj.metadata?.curso);
    if (email && producto) {
      const yaTenia = await env.ALUMNOS.get(`pedido:${obj.id}`);
      await darAcceso(env, email, producto.id, { nombre: obj.customer_details?.name || "" });
      await env.ALUMNOS.put(`pedido:${obj.id}`, JSON.stringify({ email, curso: producto.id, fecha: new Date().toISOString() }));
      if (!yaTenia) {
        const url = await enlaceAcceso(env, origin, email);
        await enviarCorreo(env, email, `Ya tienes acceso: ${producto.titulo}`, plantillaCorreo(
          "¡Gracias por tu compra!",
          [
            `Ya puedes empezar <strong>${producto.titulo}</strong>.`,
            "Pulsa el botón para entrar en tu área de alumnos. El enlace caduca en 30 minutos, pero cuando quieras volver puedes pedir otro en <a href=\"" + origin + "/acceso\">" + origin.replace("https://", "") + "/acceso</a> con este mismo correo.",
            "La factura te llega en un correo aparte de Stripe.",
          ],
          { url, texto: "Entrar al curso" },
        ));
      }
    }
  }

  if (evento.type === "charge.refunded" && obj.refunded) {
    // Reembolso total: se retira el acceso a ese curso.
    try {
      const pi = await stripe(env, "GET", `payment_intents/${obj.payment_intent}`);
      const email = obj.billing_details?.email || obj.receipt_email;
      const curso = pi.metadata?.curso;
      if (email && curso) await quitarCurso(env, email, curso);
    } catch (e) {
      console.log(e.message);
    }
  }

  return new Response("ok");
}
