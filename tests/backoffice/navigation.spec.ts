import { test, expect } from '@playwright/test';

test('@smoke TLC Stage: open Assign Task URL', async ({ page }) => {
  const startPath = process.env.BACKOFFICE_START_PATH || '/';

  await page.goto(startPath, { waitUntil: 'domcontentloaded' });

  // quick proof that page loaded (update later to a real heading)
  await expect(page).toHaveTitle('TLC Operation Management System - Powered by Creative IT Soft');
});
