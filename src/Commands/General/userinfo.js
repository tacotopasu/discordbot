const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Returns user information")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to get info on")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields({ name: "Member", value: `${user}`, inline: false })
      .addFields({
        name: "Roles",
        value: `${member.roles.cache.map((r) => r).join(" ")}`,
        inline: false,
      })
      .addFields({
        name: "Server Join Date",
        value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
        inline: true,
      })
      .addFields({
        name: "Account Creation Date",
        value: `<t:${parseInt(user.createdAt / 1000)}:R>`,
        inline: true,
      })
      .setFooter({ text: `User ID: ${user.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
