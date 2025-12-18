const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByPlaceholder('Username');
    this.password = page.locator('#password');
    this.signInBtn = page.getByRole('button', { name: 'login' });
  }

  async gotoStart() {
    const startPath = process.env.BACKOFFICE_START_PATH || '/';
    await this.page.goto(startPath, { waitUntil: 'domcontentloaded' });
  }

  async isLoginVisible() {
    const emailVisible = await this.email.isVisible().catch(() => false);
    const passwordVisible = await this.password.isVisible().catch(() => false);
    return emailVisible || passwordVisible;
  }

  async loginIfNeeded(username, password) {
    if (!username || !password) {
      throw new Error('BACKOFFICE_USER or BACKOFFICE_PASS is missing');
    }

    if (!(await this.isLoginVisible())) return;

    await this.email.fill(username);
    await this.password.fill(password);
    await this.signInBtn.click();

    await expect(this.page).toHaveURL(/qrc=list/);
  }
}

module.exports = LoginPage;
