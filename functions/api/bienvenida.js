// GET /api/bienvenida?session_id=...  (vuelta desde Stripe tras pagar)
// Comprueba el pago, da acceso (por si el webhook aún no ha llegado) y abre la sesión.
import { stripe, darAcceso, cookieSesion, redirigir } from "../_lib/curso.js";
import { productoPorId } from "../_lib/catalogo.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("session_id");
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id)) return redirigir(`${url.origin}/acceso`);
  try {
    const sesion = await stripe(env, "GET", `checkout/sessions/${id}`);
    const email = sesion.customer_details?.email;
    const producto = productoPorId(sesion.metadata?.curso);
    if (sesion.payment_status !== "paid" || !email || !producto) return redirigir(`${url.origin}/acceso?pendiente=1`);
    await darAcceso(env, email, producto.id, { nombre: sesion.customer_details?.name || "" });
    const destino = producto.id === "*" ? "/alumnos/" : `/alumnos/${producto.id}/`;
    return redirigir(`${url.origin}${destino}?nuevo=1`, { "Set-Cookie": await cookieSesion(env, email) });
  } catch (e) {
    console.log(e.message);
    return redirigir(`${url.origin}/acceso?pendiente=1`);
  }
}
