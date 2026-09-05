import { test as base, expect } from '@playwright/test';
import { LoginObject } from '../pages/login.js';
import { addTransaction } from '../pages/transaction-page/add-transcation.js';

export const test = base.test.extend({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginObject(page);
        await use(loginPage);
    },

    addNewTransaction: async ({page,request}, use) => {
        const addNewTransaction = new addTransaction(page,request);
        await use(addNewTransaction);
    }
});

export { expect };
export const setup = test;