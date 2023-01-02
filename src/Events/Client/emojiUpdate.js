const logSchema = require("../../Models/Logs");
const { EmbedBuilder } = require('discord.js');

module.exports = async (client, oldEmoji, newEmoji, guildId) => {
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            const embed = new EmbedBuilder()
                .setColor("Blue")
                .setAuthor({ name: `Emoji name changed`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(newEmoji.url)
                .setDescription([
                    `**Emoji:** ${newEmoji}`,
                    `**ID:** ${newEmoji.id}`
                ].join('\n'))
                .addFields(
                    { name: `Old name`, value: `${oldEmoji.name}`, inline: true },
                    { name: `New name`, value: `${newEmoji.name}`, inline: true }
                )
                .setTimestamp()

            logchannel.send({ embeds: [embed] })
            console.log(`${`[DEBUG]`.brightMagenta} ${`Emoji name changed`.brightWhite}`)
        }
        if (err) {
            console.log(err)
        }
    });
};