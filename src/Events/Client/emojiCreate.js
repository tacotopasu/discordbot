const logSchema = require("../../Models/Logs");
const { EmbedBuilder } = require('discord.js');

module.exports = async (client, emoji, guildId) => {
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `New emoji added`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(emoji.url)
                .setDescription([
                    `**Emoji**`,
                    `**Name:** ${emoji.name}`,
                    `**ID:** ${emoji.id}`
                ].join('\n'))
                .setTimestamp()

            logchannel.send({ embeds: [embed] });
            console.log(`${`[DEBUG]`.brightMagenta} ${`New emoji added`.brightWhite}`);
        }
        if (err) {
            console.log(err)
        }
    });
};