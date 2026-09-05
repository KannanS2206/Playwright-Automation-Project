import { expect } from "@playwright/test";

export class LoginObject {
    constructor(page) {
        this.page = page;
    }

    get email() {
        return this.page.locator('input[name="email"]');
    }
    
    get password() {
        return this.page.locator('input[name="password"]');
    }
    
    get loginButton() {
        return this.page.getByRole('button', { name: 'Log in' });
    }

    get dashboardPage() {
        return this.page.getByRole('link', { name: 'Dashboard' })
    }


    async login (username, password) {
        await this.page.goto('/login', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await expect(this.dashboardPage).toBeVisible();
    }
}