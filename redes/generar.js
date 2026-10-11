// Genera las imágenes de un post: node redes/generar.js redes/posts/<post>.html
// Cada <section class="s"> del HTML se guarda como PNG (01.png, 02.png…) en redes/salida/<post>/,
// sin metadatos (solo la imagen).
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

function sinMetadatos(file) {
  const d = fs.readFileSync(file), keep = ['IHDR', 'PLTE', 'tRNS', 'IDAT', 'IEND'], out = [d.subarray(0, 8)];
  for (let i = 8; i < d.length;) {
    const n = d.readUInt32BE(i), t = d.toString('latin1', i + 4, i + 8);
    if (keep.includes(t)) out.push(d.subarray(i, i + 12 + n));
    i += 12 + n;
  }
  fs.writeFileSync(file, Buffer.concat(out));
}

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
    const f = path.join(dir, String(i + 1).padStart(2, '0') + '.png');
    await slides[i].screenshot({ path: f });
    sinMetadatos(f);
    console.log(f);
  }
  await b.close();
})();
