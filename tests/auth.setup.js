import {test, expect} from '../fixtures/storeObjects';
import loginData from '../test-data/login-data.json' with {type : 'json'}
import { setup } from '../fixtures/storeObjects';

const authFile = 'playwright/.auth/user.json';

setup('login with valid credentials', async ({page, loginPage}) => {
    //Login Again
    await loginPage.login(
    loginData.validCredentials.username, 
    loginData.validCredentials.password);

    await page.context().storageState({path: authFile});

})

