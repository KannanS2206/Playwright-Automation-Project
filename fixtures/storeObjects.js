import { test as base, expect } from '@playwright/test';
import { LoginObject } from '../pages/login.js';
import { addTransaction } from '../pages/transaction-page/add-transcation.js';
import { AlertsDrag } from '../pages/alerts-drag-drop.js';
import { BuyCoffee } from '../pages/buy-coffee.js';

export const test = base.extend({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginObject(page);
        await use(loginPage);
    },

    addNewTransaction: async ({ page, request }, use) => {
        const addNewTransaction = new addTransaction(page, request);
        await use(addNewTransaction);
    },

    alertsTest: async ({page}, use) => {
        const alertsTest = new AlertsDrag(page);
        await use(alertsTest)
    },

    buyCoffeeTest: async ({ page, context }, use) =>{
        const buyCoffeeTest = new BuyCoffee(page, context);
        await use(buyCoffeeTest)
    }

});

export { expect };
export const setup = test;