require("dotenv").config();
const DiscordRPC = require("discord-rpc");
const clientId = process.env.CLIENT_ID;
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  setTimeout(() => {
    fetchData();
  }, 2000);

  setInterval(fetchData, 1000 * 60 * 5);
});

rpc.on("error", (err) => {
  console.error(`Error with Discord RPC: ${err.message}`);
});

rpc.login({ clientId }).catch((err) => {
  console.error(`Failed to log in to Discord RPC: ${err.message}`);
});

const fetchData = async () => {
  try {
    const response = await fetch(`http://localhost:3001/users/chillshop`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    console.log(data);
    rpc.setActivity({
      details: "Nitro Full 340",
      state: "Пользователи",
      smallImageKey: "light",
      smallImageText: "Nitro-Full-340",
      largeImageText: "nitro-full",
      largeImageKey: "light",
      startTimestamp: new Date(),
      partySize: data.memberCount,
      partyMax: 3000,
      buttons: [{ label: "CHILL SHOP", url: "https://discord.gg/chillshop" }],
    });

    console.log("Rich Presence updated!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
