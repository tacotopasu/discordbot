const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActivityType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Update my rich presence")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("activity")
        .setDescription("Update my presence")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Activity type")
            .setRequired(true)
            .addChoices(
              { name: "Playing", value: "Playing" },
              { name: "Streaming", value: "Streaming" },
              { name: "Listening", value: "Listening" },
              { name: "Competing", value: "Competing" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("activity")
            .setDescription("Update my activity")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("status")
        .setDescription("Update my status")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Status")
            .setRequired(true)
            .addChoices(
              { name: "Online", value: "online" },
              { name: "Idle", value: "idle" },
              { name: "Do Not Disturb", value: "dnd" },
              { name: "Invisible", value: "invisible" }
            )
        )
    ),

  async execute(interaction, client) {
    const { options } = interaction;
    if (interaction.user.id != 853238750027972658) {
      const embed = new EmbedBuilder();
      return interaction.reply({
        embeds: [embed.setDescription(`Only my owner can change my status!`)],
        ephemeral: true,
      });
    }
    const sub = options.getSubcommand(["activity", "status"]);
    const type = options.getString("type");
    const activity = options.getString("activity");
    try {
      switch (sub) {
        case "activity":
          switch (type) {
            case "Playing":
              client.user.setActivity(activity, {type: ActivityType.Playing});
              break;
            case "Streaming":
              client.user.setActivity(activity, {type: ActivityType.Streaming});
              break;
            case "Listening":
              client.user.setActivity(activity, {type: ActivityType.Listening});
              break;
            case "Watching":
              client.user.setActivity(activity, {type: ActivityType.Watching});
              break;
            case "Competing":
              client.user.setActivity(activity, {type: ActivityType.Competing});
              break;
          }
        case "status":
          client.user.setPresence({ status: type });
          break;
      }
    } catch (err) {
      console.log(err);
    }
    const embed = new EmbedBuilder();
    client.log(`[Status] : Changed status from ${sub} to **${type}**.`, true);
    return interaction.reply({
      embeds: [
        embed.setDescription(`Successfully updated ${sub} to **${type}**.`),
      ],
      ephemeral: true,
    });
  },
};
