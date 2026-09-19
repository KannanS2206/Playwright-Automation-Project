import { expect } from '@playwright/test';
import { LoginObject } from '../login';

const login = new LoginObject();

let assert={
    response:[
        "Done. You can close this dialog now."
    ]
};
let notesName = "Kannan Test";
let importNoteName = "Imported File";
let accessToken = "";
let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZnlmc2xnZnBjeWJ5YWpqbmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2OTQ1NzEsImV4cCI6MjA5OTI3MDU3MX0.grButg-0T-WfoPVwYDqxzaGejz_pmb2nzDk6fdj6Q4s";

export class addTransaction {
    constructor(page, request) {
        this.page = page;
        this.request = request;
    }

    get firstRowTable() {
        return this.page.locator('tr[data-slot="table-row"]').nth(1);
    }

    get deleteTransaction() {
        return this.page.getByLabel("Delete transaction").first();
    }

    get confirmDelete() {
        return this.page.getByRole('button', { name: "Delete" });
    }

    get searchTransaction() {
        return this.page.locator('[placeholder*="Search category"]');
    }

    get transactionPage() {
        return this.page.getByRole('link', { name: 'Transactions' })
    }

    get importMenu() {
        return this.page.getByRole('button', { name: "Import CSV" });
    }

    get uploadFile() {
        return this.page.locator('input[type="file"]')
    }

    get downloadTemplateButton() {
        return this.page.getByRole('button', { name: 'Download Template' });
    }

    get confirmImport(){
        return this.page.getByRole('button', { name: /Confirm Import/ })
    }

    get importCsvContainer(){
        return this.page.locator('[data-slot="dialog-body"]');
    }

    get closeButton(){
        return this.page.getByRole('button', {name:'Close'}).first();
    }


    async loginUsingApi() {
        const response = await this.request.post('https://wkfyfslgfpcybyajjndl.supabase.co/auth/v1/token?grant_type=password', {

            headers: {
                Apikey: apiKey,
                "Content-Type": "application/json"
            },

            data: {
                "email": "test@gmail.com",
                "password": "passpass",
                "gotrue_meta_security": {}
            }
        })

        expect(response.status()).toBe(200);
        const body = await response.json();
        const tokenTest = body.access_token;
        accessToken = tokenTest;
        console.log(accessToken);

    }

    async createNewTransactionWithCash() {
        const today = new Date().toISOString().split('T')[0];

        const response = await this.request.post("https://wkfyfslgfpcybyajjndl.supabase.co/rest/v1/transactions?select=*", {

            headers: {
                Apikey: apiKey,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            },

            data: {
                amount: 1000,
                category_id: "22cf11a3-1c78-49af-9ca9-281b486dc1ac",
                date: today,
                from_account_id: "76cc852c-a267-4914-8e29-e8635068f8d1",
                notes: "Kannan Test",
                sub_category: "Test",
                type: "Expense",
                user_id: "79984f8b-3de1-4384-9b97-726573535da8"
            }
        })

        //Assert the Response Code
        expect(response.status()).toBe(201);

        //Fetch the Body Content
        const body = await response.json();

        //Assert My Body Content
        expect(body[0].notes).toBe("Kannan Test");

    }

    async validateCreatedTransaction() {
        await this.transactionPage.click();
        await this.searchTransaction.fill("Kannan Test");
        await expect(this.firstRowTable).toContainText(notesName);
        await this.deleteTransaction.click();
        await this.confirmDelete.click();
    }

    async importTransaction() {
        await this.importMenu.click();
        await this.uploadFile.setInputFiles('C:/Users/kanna/Playwright Automation Cursor/test-asserts/Test Import File.csv');
        await this.confirmImport.click();
        await expect(this.importCsvContainer).toContainText(assert.response[0]);
        await this.closeButton.click();

        await this.searchTransaction.fill("Import");
        await expect(this.firstRowTable).toContainText(importNoteName);
        await this.deleteTransaction.click();
        await this.confirmDelete.click();
    }

    async downloadTemplate() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadTemplateButton.click();
        const download = await downloadPromise;
        expect(download.suggestedFilename());
    }

}