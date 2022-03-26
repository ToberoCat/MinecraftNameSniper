const MinecraftNet = require("./Minecraft");

const Minecraft = new MinecraftNet();
(async () => {
    await Minecraft.open();
    await Minecraft.login("@gmail.com", "pw");
    const success = await Minecraft.changeName("Uno");
    await Minecraft.close();
})();
