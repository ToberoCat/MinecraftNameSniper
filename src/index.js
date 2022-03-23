console.log('[General]: Starting sniperbot...');

const puppeteer = require("puppeteer");
const namemc = require("./Namemc.js");
const timeis = require("./Timeis");
const YAML = require("js-yaml");
const fs = require("fs");
const MinecraftNet = require("./Minecraft");

const config = YAML.load(fs.readFileSync("../config.yml"));

(async () => {
    console.log('[General]: Getting time delay for more accuracy...');

    let delay;
    try {
        delay = await timeis.getDelay(config.country, config.delayDetection, !config.debugging);
    } catch (e) {
        console.log('[General]: Couldn\'t get delay. Stopping sniper');
        return;
    }
    console.log(`[General]: Got your delay. Delay: ${delay}`);
    console.log(`[General]: Trying to find minecraft username ${config.mcname} available time...`);

    let time;
    try {
        time = await namemc.getAvailableTime(config.mcname, !config.debugging);
    } catch (e) {
        console.log(`[General]: Wasn't able to find time until name is usable. Stopping sniper`);
        return;
    }
    const msTillFree = time - Date.now() + delay;

    console.log(`[General]: Found name. Will rename account after ${msTillFree} ms`);

    const Minecraft = new MinecraftNet();

    setTimeout(async () => {
        console.log(`[General]: Logging into Minecraft.net...`);
        await Minecraft.open();
        await Minecraft.login(config.minecraft-microsoft.email, config.minecraft-microsoft.password);
        console.log(`[General]: Successfully logged into minecraft.net. Preparing new username`);
        await Minecraft.changeName(config.mcname);
    }, msTillFree - 60000);
    setTimeout(async () => {
        const success = await Minecraft.confirm();
        console.log(`[General]: You ${success ? "did" : "didn't"} get the name`);
        console.log("[General]: Stopping sniper...");
        await Minecraft.close();
    }, msTillFree);
})();

