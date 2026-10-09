// Área de alumnos: casillas, lecciones completadas y progreso.
// El progreso se guarda en el navegador del alumno (si no se puede, la página funciona igual).
(() => {
  const leer = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const guardar = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} };
  const hecho = (clave) => leer(`hecho:${clave}`) === "1";

  // Casillas de las tareas
  document.querySelectorAll("[data-check]").forEach((c) => {
    const k = `check:${c.dataset.check}`;
    c.checked = leer(k) === "1";
    c.addEventListener("change", () => guardar(k, c.checked ? "1" : null));
  });

  // Botón "Marcar como completada"
  document.querySelectorAll("[data-completar]").forEach((b) => {
    const clave = b.dataset.completar;
    const pintar = () => {
      const si = hecho(clave);
      b.setAttribute("aria-pressed", String(si));
      b.textContent = si ? "✓ Lección completada" : "Marcar como completada";
    };
    b.addEventListener("click", () => { guardar(`hecho:${clave}`, hecho(clave) ? null : "1"); pintar(); });
    pintar();
  });

  // Índice del curso: estado de cada lección, progreso y "continuar"
  const indice = document.querySelector(".indice");
  if (indice) {
    const enlaces = [...indice.querySelectorAll("ol.lista [data-estado]")];
    let completadas = 0;
    let siguiente = null;
    enlaces.forEach((a) => {
      if (hecho(a.dataset.estado)) { a.classList.add("completada"); completadas++; }
      else if (!siguiente) siguiente = a;
    });
    const total = enlaces.length || 1;
    indice.querySelector(".barra span").style.width = `${Math.round((completadas / total) * 100)}%`;
    indice.querySelector(".progreso p").textContent = `${completadas} de ${enlaces.length} lecciones completadas`;
    const cont = indice.querySelector("[data-continuar]");
    if (completadas && siguiente) { cont.href = siguiente.href; cont.textContent = "Continuar"; }
    else if (completadas === enlaces.length && enlaces.length) { cont.textContent = "Repasar desde el principio"; }
  }
})();
