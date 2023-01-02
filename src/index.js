const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const fs = require("fs");
const { readdir, readdirSync } = require('fs');
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});
client.commands = new Collection();
client.config = require("./config.json");
client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});

const functionFolders = fs.readdirSync(`./src/Functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/Functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
  for (const file of functionFiles)
    require(`./Functions/${folder}/${file}`)(client);
}
module.exports = client;
