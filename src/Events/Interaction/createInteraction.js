const { CommandInteraction, InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const { commands } = client;
    const { commandName } = interaction;
    const command = commands.get(commandName);
    if (!command) return;
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      // Specific for asigning roles for now // Change later
      const role = interaction.guild.roles.cache.get("1037405811825188894");
      return interaction.member.roles.add(role).then((member) =>
        interaction.reply({
          content: `You have been assigned the ${role} role.`,
          ephemeral: true,
        })
      );
    } else if (interaction.isAutocomplete()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  },
};
