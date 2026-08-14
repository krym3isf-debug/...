import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Harmless environment-verification test — confirms the Playwright browser toolchain
// (launch, navigation, DOM interaction, screenshot) works end to end in this environment.
// Uses a local fixture page rather than an external URL, since this sandbox's network
// policy blocks arbitrary outbound browsing — and it means this test never depends on
// an external site being reachable. Does not touch the live Possessionless store.
test('browser automation toolchain is working', async ({ page }) => {
  const fixturePath = path.join(__dirname, 'fixtures', 'sample.html');
  await page.goto(`file://${fixturePath}`);

  await expect(page).toHaveTitle('Playwright Toolchain Check');
  await expect(page.getByRole('heading', { name: 'Playwright is working' })).toBeVisible();

  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.getByRole('button', { name: 'Added' })).toBeVisible();

  expect(consoleErrors).toEqual([]);
  await page.screenshot({ path: 'test-results/smoke-screenshot.png' });
});
