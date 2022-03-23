const puppeteer = require("puppeteer");
const { type, sleep } = require("./Utility");

module.exports = class Minecraft {
    page;
    browser;

    open() {
        return new Promise(async (resolve, reject) => {
            this.browser = await puppeteer.launch({ headless: false, slowMo: 100 });
            this.page = await this.browser.newPage();
            resolve();
        });
    }

    login(email, password) {
        return new Promise(async (resolve, reject) => {
            await this.page.goto("https://www.minecraft.net/login");
            await this.page.waitForSelector('a.btn');
            (await this.page.$('a.btn')).click();
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
            await this.page.type("#i0116", email, { delay: 100 });
            (await this.page.$("#idSIButton9")).click();
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
            await this.page.type("#i0118", password, { delay: 100 });
            (await this.page.$("#idSIButton9")).click();
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
            (await this.page.$("#idSIButton9")).click();
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
            resolve();
        })
    }
    async close() {
        await this.browser.close();
    }

    confirm() {
        return new Promise(async (resolve, reject) => {
            const [changeName] = await this.page.$x("//button[contains(., 'Change profile name')]");

            await changeName.click();
            const [success] = await this.page.$x("//button[contains(., 'Oops!')]");
            resolve(success != null);
        });
    }

    changeName(newName) {
        return new Promise(async (resolve, reject) => {
            const [button] = await this.page.$x("//button[contains(., 'Change')]");
            await button.click();

            await this.page.type("#newName", newName);
            resolve();
        });
    }
}