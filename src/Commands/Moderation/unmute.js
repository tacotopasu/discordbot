const {
  Client,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Remove target's timeout")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to unmute")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { guild, options } = interaction;

    const target = options.getUser("target");
    const member = guild.members.cache.get(target.id);

    const errEmbed = new EmbedBuilder()
      .setDescription("Something went wrong. Try again later.")
      .setColor(0xc72c3b);

    const successEmbed = new EmbedBuilder()
      .setDescription(`**:white_check_mark: Unmuted user ${target}**`)
      .setFooter({
        text: `User ID: ${target.id}`,
        iconURL: target.displayAvatarURL(),
      })
      .setColor(0x08d119)
      .setTimestamp();

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ModerateMembers
      )
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    try {
      await member.timeout(null);

      interaction.reply({ embeds: [successEmbed] });
    } catch (err) {
      console.log("26 // Caught exception:", err);
      console.log(err);
    }
  },
};
