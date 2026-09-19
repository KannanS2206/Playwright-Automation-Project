import { test, expect } from "../fixtures/storeObjects";

test.describe("alerts and drag and drop", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/easter-egg-334354");
    });

    test("simple alert test", async ({ alertsTest }) => {
        await alertsTest.simpleAlerts();
    })

    test("confirmation alert test", async ({ alertsTest }) => {
        await alertsTest.confirmAlerts();
    })

    test("prompt alert test", async ({ alertsTest }) => {
        await alertsTest.promptAlerts();
    })

    test("Drag and Drop Test", async ({ alertsTest }) => {
        await alertsTest.dragDrop();
    })



});