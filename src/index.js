console.log('[General]: Starting sniperbot...');

const puppeteer = require("puppeteer");
const namemc = require("./Namemc.js");
const timeis = require("./Timeis");
const YAML = require("js-yaml");
const fs = require("fs");
const MinecraftNet = require("./Minecraft");

const config = YAML.load(fs.readFileSync("../config.yml"));

(async () => {
    createInterval();
})();

function createInterval() {
    const interval = setInterval(async() => {
        console.log("[Interval]: Getting timing...");
        const delay = await timeis.getDelay(config.country, config.delayDetection, !config.debugging);
        const time = await namemc.getAvailableTime(config.mcname, !config.debugging);
        console.log(`[Interval]: Timings are: ${delay}ms delay, ${time - Date.now()}ms until free`);

        const msTillFree = time - Date.now() + delay;
        if (msTillFree <= 600000) {
            console.log(`[Interval]: Final 10 minutes have entered. Preparing for accurate login`);
            const Minecraft = new MinecraftNet();
            setTimeout(() => {
                login(Minecraft);
            }, msTillFree - 60000);
            setTimeout(async () => {
                const success = await Minecraft.confirm();
                console.log(`[General]: You ${success ? "did" : "didn't"} get the name`);
                console.log("[General]: Stopping sniper...");
            }, msTillFree);
            clearInterval(interval);
        }
    }, 60 * 5000);
    console.log("[General]: Started Sniper");
}

async function login(Minecraft) {
    console.log(`[General]: Logging into Minecraft.net...`);
    await Minecraft.open();
    await Minecraft.login(config.minecraft-microsoft.email, config.minecraft-microsoft.password);
    console.log(`[General]: Successfully logged into minecraft.net. Preparing new username`);
    await Minecraft.changeName(config.mcname);
}
