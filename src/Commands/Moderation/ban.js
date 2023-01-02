const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban target from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to ban from the server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for banning the user")
    ),

  async execute(interaction, client) {
    const { channel, options } = interaction;
    const target = options.getUser("target");
    const reason = options.getString("reason") || "No reason given.";
    const member = await interaction.guild.members.fetch(target.id);
    const errEmbed = new EmbedBuilder()
      .setDescription(
        `Cannot take action on ${target}. Missing permissions.\nThe target has a higher role than you.`
      )
      .setColor(0xd10808)
      .setTimestamp();

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    await member.ban({reason: reason});
    client.log(
      `[Moderation] : Banned ${target.tag} (${target.id}) from '${interaction.guild.name}' (${interaction.guild.id})\n      [Moderation] Reason for ban: ${reason}`
    , true);

    const embed = new EmbedBuilder()
      .setDescription(`**:white_check_mark: Banned user ${target}**`)
      .addFields({ name: "Reason", value: `${reason}`, inline: true })
      .setFooter({
        text: `User ID: ${target.id}`,
        iconURL: target.displayAvatarURL(),
      })
      .setColor(0x08d119)
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });
  },
};
