const puppeteer = require("puppeteer");
const namemc = require("./Namemc.js");

const name = "fyp";

namemc.getAvailableTime(name).then((time) => {
    const msTillFree = time - Date.now();

});

