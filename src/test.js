const MinecraftNet = require("./Minecraft");

const Minecraft = new MinecraftNet();
(async () => {
    await Minecraft.open();
    await Minecraft.login("ItsNotMeMito@gmail.com", "tobias.pornhub.com");
    const success = await Minecraft.changeName("Uno");
    await Minecraft.close();
})();
