const puppeteer = require("puppeteer");
const namemc = require("./Namemc.js");
const timeis = require("./Timeis");

const name = "SaveWaterBro1135";

(async () => {
    const delay = await timeis.getDelay();
    namemc.getAvailableTime(name).then(async (time) => {
        const msTillFree = time - Date.now() + delay;

        console.log(msTillFree);

        setTimeout(() => {
           console.log("Now my turn");
        }, msTillFree);
    });
})();

