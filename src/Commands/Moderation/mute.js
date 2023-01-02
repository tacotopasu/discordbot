const {
  Client,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ApplicationCommandNumericOptionMinMaxValueMixin,
} = require("discord.js");
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Timeout target for a specific amount of time")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option.setName("target").setDescription("User to mute").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("How long the mute will last")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for muting the user")
    ),

  async execute(interaction) {
    const { guild, options } = interaction;
    const target = options.getUser("target");
    const member = guild.members.cache.get(target.id);
    const reason = options.getString("reason") || "No reason given.";
    const duration = options.getString("duration");
    const tduration = ms(duration);

    const errEmbed = new EmbedBuilder()
      .setDescription("Something went wrong. Try again later.")
      .setColor(0xd10808);

    const successEmbed = new EmbedBuilder()
      .setDescription(
        `**:white_check_mark: Muted user ${target}**`
      )
      .addFields(
        { name: "Reason", value: `${reason}`, inline: true },
        { name: "Duration", value: `${duration}`, inline: true }
      )
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

    if (!tduration)
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    try {
      await member.timeout(tduration, reason);

      interaction.reply({ embeds: [successEmbed] });
    } catch (err) {
      console.log("26 // Caught exception:", err);
      console.log(err);
    }
  },
};
