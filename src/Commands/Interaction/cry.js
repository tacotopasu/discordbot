const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder().setName("cry").setDescription("Cry because of someone")
  .addUserOption((option) => option.setName('target').setDescription('Who made you cry?').setRequired(true)),

  async execute(interaction, client) {
    const { guild, options, member } = interaction;
    const target = interaction.options.getUser('target'); 
    await interaction.deferReply();
    url = "https://neko-love.xyz/api/v1/cry";
    await fetch(url).then(async (res) => {
      let content = await res.json();
      image = content.url;
      client.log(`Requested Image: ${image}`);
      const embed = new EmbedBuilder();
      await interaction.editReply({
        embeds: [
          embed
            .setDescription(`***${interaction.user} cries because of ${target}!***`)
            .setImage(image)
            .setTimestamp()
            .setColor(0xff3fff),
        ],
      });
    });
  },
};
