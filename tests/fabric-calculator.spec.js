import { test, expect } from '@playwright/test';

test('Calculadora de tela - prueba interactiva', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('Calculadora de Tela');

  const rollWidthInput = page.locator('input[type="number"]').nth(0);
  const rollLengthInput = page.locator('input[type="number"]').nth(1);
  const pieceWidthInput = page.locator('input[type="number"]').nth(2);
  const pieceHeightInput = page.locator('input[type="number"]').nth(3);
  const pieceCountInput = page.locator('input[type="number"]').nth(4);
  const marginInput = page.locator('input[type="number"]').nth(5);

  await expect(rollWidthInput).toHaveValue('1.4');
  await expect(rollLengthInput).toHaveValue('50');
  await expect(pieceWidthInput).toHaveValue('30');
  await expect(pieceHeightInput).toHaveValue('34');
  await expect(pieceCountInput).toHaveValue('100');
  await expect(marginInput).toHaveValue('1');

  await page.click('button[type="submit"]');

  await page.waitForSelector('.results-panel', { timeout: 5000 });

  await expect(page.locator('.results-panel')).toBeVisible();
  await expect(page.locator('.fabric-visualizer canvas')).toBeVisible();

  console.log('✅ Calculadora cargada correctamente');
  console.log('✅ Formulario con valores por defecto');
  console.log('✅ Cálculo realizado exitosamente');
  console.log('✅ Resultados y visualización mostrados');

  await page.screenshot({ path: 'test-results/fabric-calculator.png', fullPage: true });

  await page.waitForTimeout(60000);
});
