import { test, expect } from '../fixtures/storeObjects';
import loginData from '../test-data/login-data.json' with {type : 'json'}

test.describe('Transaction Tests', () => {

    test.beforeEach(async ({ addNewTransaction }) => {

        // Login using API before each test
        await addNewTransaction.loginUsingApi();

    // //Login Using UI
    // await loginPage.login(
    // loginData.validCredentials.username, 
    // loginData.validCredentials.password);
    });

    test('create, validate, download and import transaction', async ({ page, addNewTransaction}) => {

        // Add New Transaction
        await addNewTransaction.createNewTransactionWithCash();

        // Navigate to Dashboard
        await page.goto('/dashboard');

        // Validate Created Transaction
        await addNewTransaction.validateCreatedTransaction();

        // Download Template
        await addNewTransaction.downloadTemplate();

        // Import Transaction
        await addNewTransaction.importTransaction();
    });

});