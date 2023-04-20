const puppeteer = require('puppeteer');
describe('my first test with jest-puppeteer', () => {
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            args: ['--incognito'],
        });
        page = await browser.newPage();
    });
    beforeEach(async () => {
        await page.goto('http://localhost:8000');
    });
    afterAll(async () => {
        await browser.close();
    });
    it('can count', async () => {
        // refer to the elements we need
        const counter = await page.$('#counter');
        const btn = await page.$('#btn');
        // before any click we expect 0
        let counterText = await page.evaluate(
            el => el.textContent, counter
        )
        expect(+counterText).toEqual(0);
        // cick the button
        await btn.click();
        // expect counter to increament
        counterText = await page.evaluate(el => el.textContent, counter)
        expect(+counterText).toEqual(1);
    });
})