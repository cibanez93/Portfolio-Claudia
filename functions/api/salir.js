// /api/salir → cierra la sesión.
import { cookieBorrar, redirigir } from "../_lib/curso.js";

export const onRequest = ({ request }) => redirigir(`${new URL(request.url).origin}/acceso?salida=1`, { "Set-Cookie": cookieBorrar });
