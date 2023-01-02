const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban user ID from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("User ID to unban from the server.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { channel, options } = interaction;
    const userId = options.getString("userid");

    try {
      await interaction.guild.members.unban(userId);
      client.log(
        `[Moderation] : Unbanned ${userId} from '${interaction.guild.name}' (${interaction.guild.id})`
      );

      const embed = new EmbedBuilder()
        .setDescription(`Unbanned User ID ${userId}.`)
        .setColor(0x08d119)
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
      });
    } catch (err) {
      console.log("26 // Caught exception:", err);
      console.log(err);

      const errEmbed = new EmbedBuilder()
        .setDescription(
          `User ID ${userId} is invalid.\nPlease provide a valid User ID.`
        )
        .setColor(0xd10808);

      await interaction.reply({
        embeds: [errEmbed],
      });
    }
  },
};
