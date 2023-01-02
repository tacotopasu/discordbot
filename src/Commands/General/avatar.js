const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get a user's avatar")
    .addUserOption((option) =>
      option.setName("target").setDescription("User to get avatar from")
    ),
  execute(interaction, client) {
    target = interaction.options.getUser("target");
    if(!target) target = interaction.user;
    userAvatar = target.displayAvatarURL({ dynamic: true });
    embed = new EmbedBuilder();
    interaction.reply({
      embeds: [
        embed
          .setTitle(`${target.username}'s avatar`)
          .setImage(`${userAvatar}?size=1024`)
          .setTimestamp()
          .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          }),
      ],
    });
  },
};
