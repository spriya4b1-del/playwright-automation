import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  use: {
    // Base URL = domain only
    baseURL: process.env.BACKOFFICE_BASE_URL,

    headless: false, // keep false for now so you can see what happens
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  reporter: [
    ['html', { open: 'never' }]
  ],
});
