const puppeteer = require("puppeteer");
const { sleep } = require("./Utility");

function getDelay() {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://time.is/de/');

        await sleep(700);

        const delayElement = await page.$("#syncH");
        const delay = await page.evaluate(el => el.textContent, delayElement);

        await browser.close();

        const numbersOnly = delay.replace(/[a-zA-Z]/g,"").replace(".", "").replace(",", ".").trim();

        resolve(parseFloat(numbersOnly) * 1000);
    });
}

module.exports.getDelay = getDelay;