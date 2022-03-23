const puppeteer = require("puppeteer");

function getAvailableTime(username, headless) {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ headless: headless, slowMo: 250 });
        const page = await browser.newPage();
        await page.goto(`https://namemc.com/search?q=${username}`);

        const availableTimeElement = await page.$("#availability-time");
        if (availableTimeElement == null) {
            await browser.close();
            return reject();
        }
        const availableTime = await page.evaluate(el => el.dateTime, availableTimeElement);

        await browser.close();

        resolve(new Date(availableTime));
    });
}

module.exports.getAvailableTime = getAvailableTime;