import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// playwright-bdd convierte los .feature en tests de Playwright dentro de testDir.
const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.ts',
});

export default defineConfig({
  testDir,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    // saucedemo identifica sus elementos con data-test="..." en lugar de data-testid.
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      // En la compu usa el Chrome instalado (el Chromium de Playwright quedaba bloqueado
      // por Windows: "spawn UNKNOWN"). En GitHub Actions usa el Chromium de Playwright.
      use: { ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'chrome' },
    },
  ],
});
