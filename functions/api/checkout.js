// POST /api/checkout  (campo "curso") → redirige a Stripe Checkout.
import { stripe, redirigir } from "../_lib/curso.js";
import { productoPorId } from "../_lib/catalogo.js";

export async function onRequestPost({ request, env }) {
  const origin = new URL(request.url).origin;
  const form = await request.formData();
  const producto = productoPorId(String(form.get("curso") || ""));
  if (!producto) return new Response("Curso no encontrado", { status: 404 });
  if (!producto.precio || !env.STRIPE_SECRET_KEY) return redirigir(`${origin}${producto.pagina}?pronto=1#comprar`);

  try {
    const sesion = await stripe(env, "POST", "checkout/sessions", {
      mode: "payment",
      locale: "es",
      "line_items[0][price]": producto.precio,
      "line_items[0][quantity]": "1",
      "metadata[curso]": producto.id,
      "payment_intent_data[metadata][curso]": producto.id,
      success_url: `${origin}/api/bienvenida?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${producto.pagina}#comprar`,
      allow_promotion_codes: "true",
      "invoice_creation[enabled]": "true",
      "tax_id_collection[enabled]": "true",
      billing_address_collection: "required",
      "consent_collection[terms_of_service]": "required",
      "custom_text[terms_of_service_acceptance][message]":
        "Acepto las [condiciones de compra](https://claudiaibanez.com/condiciones-cursos) y que el acceso al curso empiece ya, por lo que pierdo el derecho de desistimiento de 14 días (la garantía de satisfacción se mantiene).",
    });
    return redirigir(sesion.url);
  } catch (e) {
    console.log(e.message);
    return redirigir(`${origin}${producto.pagina}?error=pago#comprar`);
  }
}
