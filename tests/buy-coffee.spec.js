import {test, expect} from "../fixtures/storeObjects";

test.describe("buy coffee test for windows handling", () =>{

    test.beforeEach("go to the site", async ({ page }) => {
        await page.goto("/dashboard");
    })

    test('buy me a coffee choosed', async ({ buyCoffeeTest }) =>{
        await buyCoffeeTest.buyCoffeeTab();
    })

})