import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      // Chromium-based mobile emulation (not WebKit) — only Chromium is
      // pre-installed in this environment; see docs/playwright-testing.md.
      use: { ...devices['Pixel 7'] },
    },
  ],
});
