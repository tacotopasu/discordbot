const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Roll the dice! Will return a value from 1 to 6"),
  async execute(interaction, client) {
    await interaction.deferReply();
    await fetch('https://api.catboys.com/dice').then(async (res) => {
      let content = await res.json();
      image = content.url;
      num = content.response;
      const embed = new EmbedBuilder();
      await interaction.editReply({
        embeds: [
          embed
            .setTitle(`You rolled a ${num}!`)
            .setImage(image)
            .setColor(0x356df7)
            .setFooter({
              text: `Requested by ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
              }),
            }),
        ],
      });
    });
  },
};
