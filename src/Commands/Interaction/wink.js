const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wink")
    .setDescription("Wink to someone")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Who will you wink to?")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild, options, member } = interaction;
    const target = interaction.options.getUser("target");
    await interaction.deferReply();
    url = "https://some-random-api.ml/animu/wink";
    await fetch(url).then(async (res) => {
      let content = await res.json();
      image = content.link;
      client.log(`Request made to ${url}`, false);
      client.log(` Image: ${image}`);
      const embed = new EmbedBuilder();
      await interaction.editReply({
        embeds: [
          embed
            .setDescription(`***${interaction.user} winks to ${target}!***`)
            .setImage(image)
            .setTimestamp()
            .setColor(0xff3fff),
        ],
      });
    });
  },
};
