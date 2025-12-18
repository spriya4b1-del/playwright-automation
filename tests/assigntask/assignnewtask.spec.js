const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/backoffice/LoginPage');
const Sidebar = require('../../pages/backoffice/Sidebar');

test('@smoke @assignnewtask navigate to assign new task', async ({ page }) => {
  const login = new LoginPage(page);
  const sidebar = new Sidebar(page);

  // login
  await login.gotoStart();
  await login.loginIfNeeded(
    process.env.BACKOFFICE_USER,
    process.env.BACKOFFICE_PASS
  );

  // navigate from sidebar
  await sidebar.goToAssignNewTask();

  // assertion
  await expect(page.getByRole('heading', { name: 'Assign New Task' })).toBeVisible();
});
