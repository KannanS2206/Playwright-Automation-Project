import {test, expect} from "@playwright/test";

export class BuyCoffee{
    constructor(page, context){
        this.page = page;
        this.context = context;
    }

    get helpButton(){
        return this.page.getByRole('button', {name:"Help"});
    }

    get donateLink() {
        return this.page.getByRole("link", { name: "Donate" });
    }

    get buyCoffeeButton(){
        return this.page.getByRole("link", {name: "Buy me a coffee"});
    }

    get body(){
        return this.page.locator("body");
    }



    async buyCoffeeTab(){
        await this.helpButton.click();
        await this.donateLink.click();
        const [newTab] = await Promise.all([this.context.waitForEvent("page"), this.buyCoffeeButton.click()]);
        await newTab.waitForLoadState();

        await expect(newTab.locator("body")).toContainText("Support Sibi V");
        await newTab.close();

        await expect(this.buyCoffeeButton).toBeVisible();
    }
}