function loadCommands(client) {
  const fs = require("fs");

  let commandsArray = [];
  const commandsFolder = fs.readdirSync("./src/Commands");

  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./src/Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);
      const properties = {folder, ...commandFile}
      client.commands.set(commandFile.data.name, properties);
      commandsArray.push(commandFile.data.toJSON());
      continue;
    }
  }

  client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };
