const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();
const port = 3001;
require("dotenv").config();
const TOKEN = process.env.BOT_TOKEN;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const GUILD_ID = process.env.GUILD_ID;

client.once("ready", () => {
  console.log(`Бот ${client.user.tag} стартовал`);
});

app.get("/users/chillshop", (req, res) => {
  try {
    async function getGuildInfo() {
      const guild = await client.guilds.fetch(GUILD_ID);
      res.json({
        guildId: guild.id,
        memberCount: guild.memberCount,
      });
      return guild;
    }
    getGuildInfo();
  } catch (err) {
    console.log("Error: " + err);
  }
});

client.login(TOKEN);

app.listen(port, () => {
  console.log(`API стартовал на порту: ${port}`);
});
