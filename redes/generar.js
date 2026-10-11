// Genera las imágenes de un post: node redes/generar.js redes/posts/<post>.html
// Cada <section class="s"> se guarda como PNG (01.png, 02.png…) en redes/salida/<post>/.
// Las que llevan class="anim" se guardan además como vídeo MP4 (01.mp4…), de data-dur segundos.
// Ni las imágenes ni los vídeos llevan metadatos.
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const FPS = 30;

function pngSinMetadatos(file) {
  const d = fs.readFileSync(file), keep = ['IHDR', 'PLTE', 'tRNS', 'IDAT', 'IEND'], out = [d.subarray(0, 8)];
  for (let i = 8; i < d.length;) {
    const n = d.readUInt32BE(i), t = d.toString('latin1', i + 4, i + 8);
    if (keep.includes(t)) out.push(d.subarray(i, i + 12 + n));
    i += 12 + n;
  }
  fs.writeFileSync(file, Buffer.concat(out));
}

// Para todas las animaciones en el instante t (ms)
const fijar = (p, t) => p.evaluate(t => document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }), t);

(async () => {
  const src = path.resolve(process.argv[2]);
  const dir = path.join(__dirname, 'salida', path.basename(src, '.html'));
  fs.mkdirSync(dir, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + src);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const slides = await p.$$('section.s');
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i], base = path.join(dir, String(i + 1).padStart(2, '0'));
    const anim = await s.evaluate(e => e.classList.contains('anim') && Number(e.dataset.dur || 6));
    if (anim) {
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'frames-'));
      for (let f = 0; f < anim * FPS; f++) {
        await fijar(p, f * 1000 / FPS);
        await s.screenshot({ path: path.join(tmp, String(f).padStart(4, '0') + '.png') });
      }
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, '%04d.png'),
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-movflags', '+faststart',
        '-map_metadata', '-1', '-fflags', '+bitexact', '-flags:v', '+bitexact', '-bsf:v', 'filter_units=remove_types=6',
        tmp + '.mp4']);
      // segunda pasada sin recodificar para quitar la etiqueta del codificador
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp + '.mp4', '-c', 'copy', '-map_metadata', '-1',
        '-map_metadata:s:v', '-1', '-fflags', '+bitexact', '-flags:v', '+bitexact', '-metadata:s:v:0', 'encoder=',
        '-movflags', '+faststart', base + '.mp4']);
      fs.rmSync(tmp + '.mp4');
      fs.rmSync(tmp, { recursive: true });
      console.log(base + '.mp4');
    }
    await fijar(p, 60000); // imagen fija: animaciones terminadas
    await s.screenshot({ path: base + '.png' });
    pngSinMetadatos(base + '.png');
    console.log(base + '.png');
  }
  await b.close();
})();
