import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';

setDefaultTimeout(60_000); // 60s pour éviter les timeouts

let browser;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function ({ result, pickle }) {
    if (result.status === Status.PASSED) {
        const img = await this.page.screenshot();
        await this.attach(img, 'image/png');
    }

    await this.page.close();
    await this.context.close();
});

AfterAll(async () => {
    await browser.close();
});
