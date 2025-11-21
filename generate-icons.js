import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';

async function generateIcon(size) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: size, height: size }
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <canvas id="canvas" width="${size}" height="${size}"></canvas>
      <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Fondo con gradiente
        const gradient = ctx.createLinearGradient(0, 0, ${size}, ${size});
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ${size}, ${size});

        // Dibujar icono de regla/medida
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        ctx.lineWidth = ${size * 0.08};
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const padding = ${size * 0.2};
        const width = ${size} - padding * 2;
        const height = ${size} - padding * 2;

        // Marco de regla
        ctx.strokeRect(padding, padding, width, height);

        // Marcas de medida
        const marks = 8;
        for (let i = 0; i <= marks; i++) {
          const x = padding + (width / marks) * i;
          const markHeight = i % 2 === 0 ? ${size * 0.15} : ${size * 0.08};
          ctx.beginPath();
          ctx.moveTo(x, padding);
          ctx.lineTo(x, padding + markHeight);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x, padding + height);
          ctx.lineTo(x, padding + height - markHeight);
          ctx.stroke();
        }

        // Tijeras (símbolo de corte)
        const scissorSize = ${size * 0.25};
        const centerX = ${size * 0.5};
        const centerY = ${size * 0.5};

        ctx.lineWidth = ${size * 0.04};

        // Tijera izquierda
        ctx.beginPath();
        ctx.arc(centerX - scissorSize * 0.3, centerY - scissorSize * 0.2, scissorSize * 0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX - scissorSize * 0.3, centerY - scissorSize * 0.2);
        ctx.lineTo(centerX, centerY + scissorSize * 0.3);
        ctx.stroke();

        // Tijera derecha
        ctx.beginPath();
        ctx.arc(centerX + scissorSize * 0.3, centerY - scissorSize * 0.2, scissorSize * 0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX + scissorSize * 0.3, centerY - scissorSize * 0.2);
        ctx.lineTo(centerX, centerY + scissorSize * 0.3);
        ctx.stroke();
      </script>
    </body>
    </html>
  `);

  await page.waitForTimeout(500);
  const screenshot = await page.screenshot({ type: 'png' });
  await browser.close();

  return screenshot;
}

(async () => {
  console.log('Generando iconos PWA...');

  const icon192 = await generateIcon(192);
  writeFileSync('public/pwa-192x192.png', icon192);
  console.log('✓ Icono 192x192 generado');

  const icon512 = await generateIcon(512);
  writeFileSync('public/pwa-512x512.png', icon512);
  console.log('✓ Icono 512x512 generado');

  console.log('✅ Iconos PWA generados exitosamente');
})();
