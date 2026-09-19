import {test, expect} from "@playwright/test"

export class AlertsDrag{

    constructor(page){
        this.page = page;
    }

    get simpleAlertButton(){
        return this.page.getByRole('button', {name: "Simple Alert"});
    }

    get confirmationAlertButton(){
        return this.page.getByRole('button', {name: "Confirmation Alert"});
    }

    get promptAlertButton(){
        return this.page.getByRole('button', {name: "Prompt Alert"});
    }

    get toDoCard(){
        return this.page.locator('div[class*="bg-card"]').first();
    }

    get inProgressCard(){
        return this.page.locator('div[class*="bg-card"]').nth(1);
    }

    get doneCard(){
        return this.page.locator('div[class*="bg-card"]').last();
    }

    get ticket(){
        return this.page.getByText("Write tests");
    }



    async simpleAlerts() {
        this.page.on("dialog", async dialog => {
            expect(dialog.type()).toBe("alert");
            expect(dialog.message()).toContain("This is a simple alert");
    
            await dialog.accept();
        });
    
        await this.simpleAlertButton.click();
    }


    async confirmAlerts() {
        this.page.on("dialog", async dialog => {
            expect(dialog.type()).toBe("confirm");
            expect(dialog.message()).toContain("Are you sure you want to confirm this?");
    
            await dialog.dismiss();
        });
    
        await this.confirmationAlertButton.click();
    }


    async promptAlerts() {
        this.page.on("dialog", async dialog => {
            expect(dialog.type()).toBe("prompt");
            expect(dialog.message()).toContain("Please enter your name");
    
            await dialog.accept("Kannan");
        });
    
        await this.promptAlertButton.click();
    }


    async dragDrop(){
        await this.ticket.dragTo(this.inProgressCard);
        await expect(this.inProgressCard).toContainText("Write tests");

        await this.ticket.dragTo(this.doneCard);
        await expect(this.doneCard).toContainText("Write tests");

        
        await this.ticket.dragTo(this.toDoCard);
        await expect(this.toDoCard).toContainText("Write tests");
    }


}