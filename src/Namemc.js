const puppeteer = require("puppeteer");

function getAvailableTime(username) {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(`https://de.namemc.com/search?q=${username}`);

        const availableTimeElement = await page.$("#availability-time");
        const availableTime = await page.evaluate(el => el.dateTime, availableTimeElement);

        await browser.close();

        resolve(new Date(availableTime));
    });
}

module.exports.getAvailableTime = getAvailableTime;