import {test, expect} from '../fixtures/storeObjects';
import loginData from '../test-data/login-data.json' with {type : 'json'}

test('login with valid credentials', async ({page, loginPage, addNewTransaction}) => {
    // await loginPage.login(
    //     loginData.validCredentials.username, 
    //     loginData.validCredentials.password);

    //Login Using API
    await addNewTransaction.loginUsingApi();

    //Add New Transaction
    await addNewTransaction.createNewTransactionWithCash();

    // //Login Again
    // await loginPage.login(
    // loginData.validCredentials.username, 
    // loginData.validCredentials.password);

    await page.goto('/dashboard');

    //Validate the Created One and Delete it
    await addNewTransaction.validateCreatedTransaction();
})

