import { Page, expect, Locator } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder("Username");
        this.password = page.locator('#password');
        this.signInBtn = page.getByRole('button',{name: 'login'});      
    }

    async gotoStart() {
        const startPath = process.env.BACKOFFICE_START_PATH || '/';
        await this.page.goto(startPath, { waitUntil: 'domcontentloaded'});
    }

    async isLoginVisible(): Promise<boolean>{

        return (await this.email.isVisible().catch(() => false)) || (await this.password.isVisible().catch(() => false));
    }

    async loginIfNeeded(username: string,password: string ) {
        if (!(await this.isLoginVisible())) return;

        await this.email.fill(username);
        await this.password.fill(password);
        await this.signInBtn.click();
        await expect(this.page).toHaveURL('?rf=Task&qrc=list');
    }
}