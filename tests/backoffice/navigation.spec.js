const { test, expect } = require('@playwright/test');

test('@smoke TLC Stage: open Assign Task URL', async ({ page }) => {
  const startPath = process.env.BACKOFFICE_START_PATH || '/';

  await page.goto(startPath, { waitUntil: 'domcontentloaded' });

  // Quick proof that page loaded (can be improved later)
  await expect(page).toHaveTitle(
    'TLC Operation Management System - Powered by Creative IT Soft'
  );
});
