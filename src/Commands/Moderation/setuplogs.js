const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setuplogs")
        .setDescription("Set up logging channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Channel for logging messages.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, guildId, options } = interaction;

        const logChannel = options.getChannel("channel") || channel;
        const embed = new EmbedBuilder();

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription("Logs have been setup successfully!")
                    .setColor("Green")
                    .setTimestamp();
            } else if (data) {
                logSchema.findOneAndDelete({ Guild: guildId });
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription("Logs have been setup successfully! (Old settings were replaced)")
                    .setColor("Green")
                    .setTimestamp();
            }

            if (err) {
                embed.setDescription("Something went wrong! Taco has been notified and will work on it! ;c")
                    .setColor("Red")
                    .setTimestamp();
            }

            return interaction.reply({ embeds: [embed], ephemeral: true });
        })
    }
}

