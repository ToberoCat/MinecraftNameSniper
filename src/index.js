const puppeteer = require("puppeteer");
const namemc = require("./Namemc.js");
const timeis = require("./Timeis");
const YAML = require("js-yaml");
const fs = require("fs");

const config = YAML.load(fs.readFileSync("../config.yml"));

(async () => {
    const delay = await timeis.getDelay(config.country, config.delayDetection);
    namemc.getAvailableTime(config.mcname).then(async (time) => {
        const msTillFree = time - Date.now() + delay;

        console.log(msTillFree);

        setTimeout(() => {
           console.log("Now my turn");
        }, msTillFree);
    });
})();

