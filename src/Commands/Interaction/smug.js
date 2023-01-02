const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder().setName("smug").setDescription("Smug at someone")
  .addUserOption((option) => option.setName('target').setDescription('Who are you going to smug at?').setRequired(true)),

  async execute(interaction, client) {
    const { guild, options, member } = interaction;
    const target = interaction.options.getUser('target'); 
    await interaction.deferReply();
    url = "https://neko-love.xyz/api/v1/smug";
    await fetch(url).then(async (res) => {
      let content = await res.json();
      image = content.url;
      client.log(`Requested Image: ${image}`);
      const embed = new EmbedBuilder();
      await interaction.editReply({
        embeds: [
          embed
            .setDescription(`***${interaction.user} smugs at ${target}!***`)
            .setImage(image)
            .setTimestamp()
            .setColor(0xff3fff),
        ],
      });
    });
  },
};
