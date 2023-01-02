const { EmbedBuilder } = require("@discordjs/builders");
const {
  SlashCommandBuilder,
  Embedbuilder,
  PermissionFlagsBits,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick target from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to kick from the server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for kicking the user")
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

    client.log(
      `[Moderation] : Kicked ${target.tag} (${target.id}) from '${interaction.guild.name}' (${interaction.guild.id})\n      [Moderation] Reason for kick: ${reason}`
    , true);
    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setDescription(`**:white_check_mark: Kicked user ${target}**`)
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
