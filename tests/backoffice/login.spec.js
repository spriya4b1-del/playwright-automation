const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/backoffice/LoginPage');

test('@smoke Back Office: login and land on Dashboard', async ({ page }) => {
  const login = new LoginPage(page);

  await login.gotoStart();
  await login.loginIfNeeded(
    process.env.BACKOFFICE_USER,
    process.env.BACKOFFICE_PASS
  );

  await expect(page.locator('#content-header h1')).toHaveText('Task');
});
